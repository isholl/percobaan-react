import { Link, useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout
      title="Sign In"
      desc="Kami kembali."
      footer={
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Don't have an account?{' '}
          <Link
            to={paths.auth.register.getHref(redirectTo)}
            className="font-medium text-zinc-900 dark:text-white"
            replace
          >
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm
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
  );
};

export default LoginRoute;
