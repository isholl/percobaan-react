import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type AuthLayoutProps = {
  title?: string;
  desc?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export const AuthLayout = ({
  title = 'Belajar bang',
  desc,
  children,
  footer,
}: AuthLayoutProps) => {
  return (
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
  );
};
