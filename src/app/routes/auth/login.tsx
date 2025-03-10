import { Link } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { Head } from '@/components/seo';
import { LoginForm } from '@/features/auth/components/login-form';

const LoginRoute = () => {
  return (
    <>
      <Head title="Sign In" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 p-6 dark:bg-zinc-950">
        <AuthLayout
          desc="Kami kembali."
          footer={
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Don't have an account?{' '}
              <Link
                to={paths.auth.register.getHref()}
                className="font-medium text-zinc-900 dark:text-white"
                replace
              >
                Sign up
              </Link>
            </p>
          }
        >
          <LoginForm />
        </AuthLayout>
      </div>
    </>
  );
};

export default LoginRoute;
