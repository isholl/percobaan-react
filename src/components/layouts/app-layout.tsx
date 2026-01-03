import { Head } from '@/components/seo';

import { Navbar } from './navbar';

type AppLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export const AppLayout = ({ children, title, description }: AppLayoutProps) => {
  return (
    <>
      <Head title={title} description={description} />
      <section className="px-6 py-4 sm:px-10 md:px-14">
        <div className="container">
          <Navbar />
        </div>
      </section>
      <div className="container">
        <section className="px-4 pt-10 sm:px-8 md:px-14 lg:px-20">
          <div className="grid items-center justify-start">
            <div className="flex flex-col items-start text-left">
              {children}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
