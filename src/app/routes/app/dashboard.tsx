import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useLogout, useUser } from '@/lib/auth';

const DashboardRoute = () => {
  const user = useUser();
  const navigate = useNavigate();

  const logout = useLogout({
    onSuccess: () => navigate(paths.auth.login.getHref(location.pathname)),
  });

  return (
    <>
      <h1>
        Welcome {user.data?.firstName} {user.data?.lastName}
      </h1>
      <Button
        type="button"
        isLoading={logout.isPending}
        onClick={() => logout.mutate({})}
        disabled={logout.isPending}
      >
        Sign out
      </Button>
    </>
  );
};

export default DashboardRoute;
