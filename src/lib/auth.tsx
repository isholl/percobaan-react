import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
import { z } from 'zod';

import { paths } from '@/config/paths';

const loginInputSchema = z.object({
  email: z.string().min(4).email(),
  password: z.string().min(8),
});

export type loginInput = z.infer<typeof loginInputSchema>;

export const useLoginForm = () => {
  return useForm<loginInput>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
};

export const handleLoginSubmit = (
  values: loginInput,
  navigate: ReturnType<typeof useNavigate>,
  setShowAlert: (value: boolean) => void,
) => {
  const user = JSON.parse(localStorage.getItem('userData') || '{}');
  if (values.email === user.email && values.password === user.password) {
    sessionStorage.setItem('userData', JSON.stringify(user));
    navigate(paths.app.dashboard.getHref());
  } else {
    setShowAlert(true);
  }
};

const registerInputSchema = z.object({
  username: z.string().min(4),
  email: z.string().min(4).email(),
  password: z.string().min(8),
});

export type registerInput = z.infer<typeof registerInputSchema>;

export const useRegisterForm = () => {
  return useForm<registerInput>({
    resolver: zodResolver(registerInputSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
};

export const handleRegisterSubmit = (
  values: registerInput,
  navigate: ReturnType<typeof useNavigate>,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        localStorage.setItem('userData', JSON.stringify(values));
        navigate(paths.auth.login.getHref());
        resolve();
      } catch (error) {
        console.error('Registration failed', error);
        reject(error);
      }
    }, 2000);
  });
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = JSON.parse(sessionStorage.getItem('userData') || '{}');

  if (!user.username) {
    return <Navigate to={paths.auth.login.getHref()} replace />;
  }

  return children;
};
