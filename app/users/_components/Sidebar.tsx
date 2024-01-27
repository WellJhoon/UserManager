import { Button } from "@/components/ui/button";
import { BellIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <span className="">TeamTrackr</span>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            { (
              <button onClick={() => router.push("/users")}>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  {/*Todavia no Funcional */}
                  <HomeIcon className="h-4 w-4" />
                  Users
                </Link>
              </button>
            )}
            <button onClick={() => router.push("/main")}>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                {/*Todavia no Funcional */}
                <HomeIcon className="h-4 w-4" />
                Project
              </Link>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
