import { Navbar } from './navbar';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <section className="px-6 py-4 sm:px-10 md:px-14">
        <div className="container">
          <Navbar />
        </div>
      </section>
      <div className="container">{children}</div>
    </>
  );
};
