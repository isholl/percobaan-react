import { Link } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { Head } from '@/components/seo';
import { RegisterForm } from '@/features/auth/components/register-form';

const RegisterRoute = () => {
  return (
    <>
      <Head title="Sign Up" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 p-6 dark:bg-background">
        <AuthLayout
          desc="Sign up for free."
          footer={
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{' '}
              <Link
                to={paths.auth.login.getHref()}
                className="font-medium text-zinc-900 dark:text-white"
                replace
              >
                Sign in
              </Link>
            </p>
          }
        >
          <RegisterForm />
        </AuthLayout>
      </div>
    </>
  );
};

export default RegisterRoute;
