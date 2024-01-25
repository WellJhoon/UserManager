/* eslint-disable react/jsx-no-undef */
"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Sidebar } from "./components/Sidebar";
import TableSection from "./components/TableSection";
import { ProjectForm } from "./components/ProjectForm";
import { useProjectForm } from "@/utils/useForm";
import { useEdit } from "@/utils/useEdit";
import EditComponent from "./components/EditComponent";

const HomePage = () => {
  const form = useProjectForm();
  const edit = useEdit();
  return (
    <>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        {/* sidebar */}
        <Sidebar />
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Link className="lg:hidden" href="#">
              <span className="sr-only">Recents</span>
            </Link>
            <UserButton />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="font-semibold text-lg md:text-2xl">Projects</h1>
              <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 ">
                <Button onClick={form.onOpen} variant="outline">
                  Add Project
                </Button>
              </div>
            </div>
            {form.isOpen && <ProjectForm />}
            {edit.isOpen && <EditComponent />}
            <TableSection />
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
