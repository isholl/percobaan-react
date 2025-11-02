export type Logo = {
  url: string;
  src: string;
  alt: string;
  title: string;
};

export type MenuItem = {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
};

export type MobileExtraLinks = {
  name: string;
  url: string;
};
