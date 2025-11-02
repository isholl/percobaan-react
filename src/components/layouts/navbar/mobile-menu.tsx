import { Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { paths } from '@/config/paths';
import { useLogout, useUser } from '@/lib/auth';

import { AuthButtons } from './auth-buttons';
import { MobileMenuItem } from './mobile-menu-item';
import type { Logo, MenuItem, MobileExtraLinks } from './types';

type MobileMenuProps = {
  menu?: MenuItem[];
  mobileExtraLinks?: MobileExtraLinks[];
  logo: Logo;
};

export const MobileMenu = ({
  menu = [],
  mobileExtraLinks = [],
  logo,
}: MobileMenuProps) => {
  const user = useUser();
  const navigate = useNavigate();

  const logout = useLogout({
    onSuccess: () => navigate(paths.auth.login.getHref(location.pathname)),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="my-6 flex flex-col gap-6">
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-4"
          >
            {menu.map((item) => MobileMenuItem(item))}
          </Accordion>
          <div className="border-t py-4">
            <div className="grid grid-cols-2 justify-start">
              {mobileExtraLinks.map((link, idx) => (
                <Link
                  key={idx}
                  className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                  to={link.url}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {user.data ? (
              <Button
                isLoading={logout.isPending}
                onClick={() => logout.mutate({})}
                disabled={logout.isPending}
              >
                Sign out
              </Button>
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
