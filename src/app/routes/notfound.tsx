import { paths } from '@/config/paths';
import { Link } from 'react-router';

const NotFoundRoute = () => {
  return (
    <>
      <h1>404 | Not Found</h1>
      <Link to={paths.home.getHref()} replace>
        Go to Home
      </Link>
    </>
  );
};

export default NotFoundRoute;
