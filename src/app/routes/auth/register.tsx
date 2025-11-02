import { Link, useNavigate, useSearchParams } from 'react-router';

import { Head } from '@/components/head';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';

const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <>
      <Head title="Sign Up" />
      <AuthLayout
        desc="Sign up for free."
        footer={
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?{' '}
            <Link
              to={paths.auth.login.getHref(redirectTo)}
              className="font-medium text-zinc-900 dark:text-white"
              replace
            >
              Sign in
            </Link>
          </p>
        }
      >
        <RegisterForm
          onSuccess={() => {
            navigate(
              `${redirectTo ? `${redirectTo}` : paths.app.dashboard.getHref()}`,
              {
                replace: true,
              },
            );
          }}
        />
      </AuthLayout>
    </>
  );
};

export default RegisterRoute;
