import { Link } from 'react-router';

import { Head } from '@/components/seo';
import { paths } from '@/config/paths';

const NotFoundRoute = () => {
  return (
    <>
      <Head title="Not Found" />
      <h1>404 | Not Found</h1>
      <Link to={paths.home.getHref()} replace>
        Go to Home
      </Link>
    </>
  );
};

export default NotFoundRoute;
