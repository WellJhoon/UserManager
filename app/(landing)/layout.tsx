const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-gray-800">
      <nav className="flex items-center justify-between p-5 bg-white dark:bg-gray-700 shadow-md">
        <span className="text-lg font-bold text-indigo-500 dark:text-indigo-300">
          User Manager
        </span>{" "}
        <section className="h-full pt-5 pr-5">{children}</section>
      </nav>
    </div>
  );
};

export default LandingLayout;