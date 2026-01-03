import { HomeIcon } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { useNavigate } from 'react-router';

import { AppLayout } from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

const LandingRoute = () => {
  const user = useUser();
  const navigate = useNavigate();

  const handleStart = () => {
    const route = user.data
      ? paths.app.dashboard.getHref()
      : paths.auth.login.getHref();

    return navigate(route);
  };

  return (
    <AppLayout description="Welcome">
      <h1 className="my-6 text-pretty text-4xl font-bold lg:text-5xl">
        Kami Kembali
      </h1>
      <p className="mb-8 max-w-xl text-lg text-muted-foreground">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque culpa
        unde accusantium laboriosam iste. Tempora accusamus placeat neque sequi
        laudantium alias, dignissimos odit ab dicta.
      </p>
      <div className="flex flex-row justify-start gap-2">
        <Button onClick={handleStart} className="w-full sm:w-auto">
          <HomeIcon /> Get started
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <a
            href="https://www.github.com/isholl/percobaan-react"
            target="_blank"
          >
            Github Repo
            <SiGithub />
          </a>
        </Button>
      </div>
    </AppLayout>
  );
};

export default LandingRoute;
