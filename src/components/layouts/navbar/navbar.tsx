import { Book, Sunset, Trees, Zap } from 'lucide-react';
import { Link } from 'react-router';

import { default as logoSvg } from '@/assets/react.svg';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

import { AuthButtons } from './auth-buttons';
import { DesktopMenu } from './desktop-menu';
import { MobileMenu } from './mobile-menu';
import type { Logo, MenuItem } from './types';
import { UserMenu } from './user-menu';

type NavbarProps = {
  logo?: Logo;
  menu?: MenuItem[];
};

export const Navbar = ({
  logo = {
    url: paths.home.getHref(),
    src: logoSvg,
    alt: 'logo',
    title: 'Percobaan React',
  },
  menu = [
    { title: 'Home', url: paths.home.getHref() },
    {
      title: 'Products',
      url: '#',
      items: [
        {
          title: 'Blog',
          description: 'The latest industry news, updates, and info',
          icon: <Book className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Company',
          description: 'Our mission is to innovate and empower the world',
          icon: <Trees className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Careers',
          description: 'Browse job listing and discover our workspace',
          icon: <Sunset className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Support',
          description:
            'Get in touch with our support team or visit our community forums',
          icon: <Zap className="size-5 shrink-0" />,
          url: '#',
        },
      ],
    },
    {
      title: 'Resources',
      url: '#',
      items: [
        {
          title: 'Help Center',
          description: 'Get all the answers you need right here',
          icon: <Zap className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Contact Us',
          description: 'We are here to help you with any questions you have',
          icon: <Sunset className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Status',
          description: 'Check the current status of our services and APIs',
          icon: <Trees className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Terms of Service',
          description: 'Our terms and conditions for using our services',
          icon: <Book className="size-5 shrink-0" />,
          url: '#',
        },
      ],
    },
    {
      title: 'Pricing',
      url: '#',
    },
    {
      title: 'Blog',
      url: '#',
    },
  ],
}: NavbarProps) => {
  const user = useUser();

  return (
    <>
      <nav className="hidden justify-between lg:flex">
        <div className="flex items-center gap-6">
          <Link to={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="w-8" alt={logo.alt} />
            <span className="text-lg font-semibold">{logo.title}</span>
          </Link>
          <div className="flex items-center">
            <DesktopMenu menu={menu} />
          </div>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          {user.data ? <UserMenu /> : <AuthButtons />}
        </div>
      </nav>
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          <Link to={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="w-8" alt={logo.alt} />
            <span className="text-lg font-semibold">{logo.title}</span>
          </Link>
          <div className="flex items-center gap-1">
            <ModeToggle />
            <MobileMenu menu={menu} logo={logo} />
          </div>
        </div>
      </div>
    </>
  );
};
