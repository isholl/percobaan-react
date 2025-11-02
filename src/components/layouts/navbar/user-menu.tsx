import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { paths } from '@/config/paths';
import { useLogout } from '@/lib/auth';

export const UserMenu = () => {
  const navigate = useNavigate();

  const logout = useLogout({
    onSuccess: () => navigate(paths.auth.login.getHref(location.pathname)),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => logout.mutate({})}>
            <LogOut className="mr-2 size-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
