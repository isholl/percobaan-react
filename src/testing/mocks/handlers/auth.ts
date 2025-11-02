import Cookies from 'js-cookie';
import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import {
  AUTH_COOKIE,
  authenticate,
  hash,
  networkDelay,
  requireAuth,
} from '../utils';

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

export const authHandlers = [
  http.post(`${env.API_URL}/auth/register`, async ({ request }) => {
    await networkDelay();

    try {
      const userObject = (await request.json()) as RegisterBody;

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingUser) {
        return HttpResponse.json(
          { message: 'The user already exists' },
          { status: 400 },
        );
      }

      db.user.create({
        ...userObject,
        password: hash(userObject.password),
      });

      await persistDb('user');

      const result = authenticate({
        email: userObject.email,
        password: userObject.password,
      });

      Cookies.set(AUTH_COOKIE, result.jwt, { path: '/' });

      return HttpResponse.json(result, {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
        },
      });
    } catch (error) {
      return HttpResponse.json(
        { message: (error as Error)?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/login`, async ({ request }) => {
    await networkDelay();

    try {
      const credentials = (await request.json()) as LoginBody;
      const result = authenticate(credentials);

      Cookies.set(AUTH_COOKIE, result.jwt, { path: '/' });

      return HttpResponse.json(result, {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
        },
      });
    } catch (error) {
      return HttpResponse.json(
        { message: (error as Error)?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/auth/logout`, async () => {
    await networkDelay();

    Cookies.remove(AUTH_COOKIE);

    return HttpResponse.json(
      { message: 'Successfully logged out' },
      {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=; Path=/;`,
        },
      },
    );
  }),

  http.get(`${env.API_URL}/auth/me`, async ({ cookies }) => {
    await networkDelay();

    try {
      const { user } = requireAuth(cookies);

      return HttpResponse.json({ data: user });
    } catch (error) {
      return HttpResponse.json(
        { message: (error as Error)?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
