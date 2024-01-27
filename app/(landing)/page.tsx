"use client";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";
import { User } from "@/types/Project";

const LandingPage = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [role, setRole] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  let userData: any;
  return (
    <>
      <div className="flex flex-col items-end justify-start">
        {!isLoaded && (
          <div className="w-full flex items-end justify-end">Esta Cargando</div>
        )}
        {isSignedIn && isLoaded && (
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
        {!isSignedIn && isLoaded && (
          <SignInButton mode="modal">
            <div>Iniciar Sesion</div>
          </SignInButton>
        )}
      </div>
    </>
  );
};

export default LandingPage;
