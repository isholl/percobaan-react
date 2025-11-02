import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { DesktopMenuItem } from './desktop-menu-item';
import type { MenuItem } from './types';

type DesktopMenuProps = {
  menu?: MenuItem[];
};

export const DesktopMenu = ({ menu = [] }: DesktopMenuProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menu.map((item) => DesktopMenuItem(item))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
