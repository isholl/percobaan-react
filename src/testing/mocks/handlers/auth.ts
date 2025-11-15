import axios from 'axios';
import Cookies from 'js-cookie';
import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import {
  AUTH_COOKIE,
  authenticate,
  encode,
  hash,
  networkDelay,
  requireAuth,
  sanitizeUser,
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

type GoogleProfile = {
  sub: string;
  name: string;
  email: string;
  given_name: string;
  picture: string;
  email_verified: boolean;
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

  http.post(`${env.API_URL}/auth/login/google`, async ({ request }) => {
    await networkDelay();

    try {
      const { token } = (await request.json()) as { token: string };

      if (!token)
        return HttpResponse.json({ message: 'Missing Token' }, { status: 400 });

      const { data: googleProfile } = await axios.get<GoogleProfile>(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          params: {
            access_token: token,
          },
        },
      );

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: googleProfile.email,
          },
        },
      });

      let user;

      if (!existingUser) {
        user = db.user.create({
          firstName: googleProfile.name.split(' ')[0],
          lastName: googleProfile.name.split(' ')[1] || '',
          email: googleProfile.email,
          password: hash(googleProfile.sub),
          role: 'USER',
        });

        await persistDb('user');
      } else {
        user = existingUser;
      }

      const sanitizedUser = sanitizeUser(user);
      const encodedToken = encode(sanitizedUser);

      const result = {
        user: sanitizedUser,
        jwt: encodedToken,
      };

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
