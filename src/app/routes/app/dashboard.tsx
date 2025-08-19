import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';

const DashboardRoute = () => {
  const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    return navigate(paths.auth.login.getHref());
  };

  return (
    <>
      <h1>Welcome {user.username}</h1>
      <Button onClick={handleLogout}>Sign out</Button>
    </>
  );
};

export default DashboardRoute;
