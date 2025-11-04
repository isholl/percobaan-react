import {
  useGoogleLogin,
  UseGoogleLoginOptionsImplicitFlow,
} from '@react-oauth/google';
import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { paths } from '@/config/paths';
import { toast } from '@/hooks/use-toast';
import { AuthResponse, User } from '@/types/api';

import { api } from './api-client';

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');

  return response.data;
};

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const loginInputSchema = z.object({
  email: z.string().min(4).email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

const loginWithGoogle = (data: { token: string }): Promise<AuthResponse> => {
  return api.post('/auth/login/google', data);
};

export const registerInputSchema = z.object({
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  email: z.string().min(4).email(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'USER']).default('USER'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const useLoginWithGoogle = (
  options: UseGoogleLoginOptionsImplicitFlow,
) => {
  const user = useUser();

  return useGoogleLogin({
    ...options,
    onSuccess: async (response) => {
      const token = response.access_token;

      await loginWithGoogle({ token });

      await user.refetch();

      options?.onSuccess?.(response);
    },
    onError: (error) => {
      toast({
        title: 'Error Logging In',
        description: error.error,
        variant: 'destructive',
      });

      options?.onError?.(error);
    },
  });
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
