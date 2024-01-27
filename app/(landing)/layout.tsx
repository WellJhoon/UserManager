"use client";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col dark:bg-gray-800">
      <nav className="flex items-center justify-between p-5 bg-white dark:bg-gray-700 shadow-md">
        <span className="text-lg font-bold text-indigo-500 dark:text-indigo-300">
          TeamTrackr
        </span>{" "}
        <section className="h-full pt-5 pr-5">{children}</section>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-4 text-indigo-500 dark:text-indigo-300">
          Welcome to TeamTrackr
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
          Manage your users efficiently with our User Manager application. Click
          the button below to explore the main page.
        </p>
        <button
          className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
          type="button"
          onClick={() => router.push("/main")}
        >
          Go to Main Page
        </button>
      </div>
    </div>
  );
};

export default LandingLayout;
