import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

type AuthLayoutProps = {
  title?: string;
  desc?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const AuthLayout = ({
  title = 'Percobaan React',
  desc,
  children,
  footer,
}: AuthLayoutProps) => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate(redirectTo ? redirectTo : paths.app.dashboard.getHref(), {
        replace: true,
      });
    }
  }, [user.data, navigate, redirectTo]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 p-6 dark:bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-base font-semibold">
            {desc}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex justify-center">{footer}</CardFooter>
      </Card>
    </div>
  );
};
