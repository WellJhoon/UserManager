"use client";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

const LandingPage = () => {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <>
      <div className="flex flex-col items-end justify-start">
        {!isLoaded && (
          <div className="w-full flex items-end justify-end">Ta cargando</div>
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
