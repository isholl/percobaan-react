import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative overflow-hidden border-none shadow-none"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="absolute size-4 transition-transform duration-300 dark:rotate-90 dark:opacity-0" />
      <Moon className="absolute size-4 rotate-90 opacity-0 transition-transform duration-300 dark:rotate-0 dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
