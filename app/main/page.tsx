/* eslint-disable react/jsx-no-undef */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserButton } from "@clerk/nextjs";
import { BellIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" href="#">
                {/* <UsersIcon className="h-6 w-6" /> */}
                <span className="">User Management</span>
              </Link>
              <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                <BellIcon className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <HomeIcon className="h-4 w-4" />
                  Recent
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  {/* <UsersIcon className="h-4 w-4" /> */}
                  Projects
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  href="#"
                >
                  {/* <FolderIcon className="h-4 w-4" /> */}
                  Tasks
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Link className="lg:hidden" href="#">
              {/* <UsersIcon className="h-6 w-6" /> */}
              <span className="sr-only">Recents</span>
            </Link>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  {/* <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" /> */}
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                    placeholder="Search users..."
                    type="search"
                  />
                </div>
              </form>
            </div>
            <UserButton />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="font-semibold text-lg md:text-2xl">Projects</h1>
              <Button className="ml-auto" size="sm">
                Add Project
              </Button>
            </div>
            <div className="border shadow-sm rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Name</TableHead>
                    <TableHead className="max-w-[150px]">Desription</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Owner
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      People Assigned a Project
                    </TableHead>
                    <TableHead>Creation date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Colmadon Fefita
                    </TableCell>
                    <TableCell>Este colmado vende selbesa fria</TableCell>
                    <TableCell className="hidden md:table-cell">
                      oh yo xd
                    </TableCell>
                    <TableCell>Manuel Atiende al colmado</TableCell>
                    <TableCell>21-2-2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      La comprabenta
                    </TableCell>
                    <TableCell>Aqui acetamo abanico robao</TableCell>
                    <TableCell className="hidden md:table-cell">
                      Si te digo me meten preso
                    </TableCell>
                    <TableCell>Un pana ahi</TableCell>
                    <TableCell>21-2-2023</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
