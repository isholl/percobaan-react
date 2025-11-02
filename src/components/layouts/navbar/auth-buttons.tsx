import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';

type AuthButtonsProps = {
  auth?: {
    login: {
      text: string;
      url: string;
    };
    register: {
      text: string;
      url: string;
    };
  };
};

export const AuthButtons = ({
  auth = {
    login: { text: 'Sign in', url: paths.auth.login.getHref() },
    register: { text: 'Sign up', url: paths.auth.register.getHref() },
  },
}: AuthButtonsProps) => {
  return (
    <>
      <Button asChild variant="outline">
        <Link to={auth?.login.url}>{auth?.login.text}</Link>
      </Button>
      <Button asChild>
        <Link to={auth?.register.url}>{auth?.register.text}</Link>
      </Button>
    </>
  );
};
