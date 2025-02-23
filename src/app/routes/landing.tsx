import { Head } from '@/components/seo';
import { paths } from '@/config/paths';
import { Link } from 'react-router';

const LandingRoute = () => {
  return (
    <>
      <Head description="Welcome" />
      <h1>Landing Page</h1>
      <Link to={paths.auth.login.getHref()}>Login</Link>
    </>
  );
};

export default LandingRoute;
