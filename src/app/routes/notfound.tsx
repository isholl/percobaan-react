import { Link } from 'react-router';

import { paths } from '@/config/paths';

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
