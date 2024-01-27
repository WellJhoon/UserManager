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

  if (user) {
    const userResponse = JSON.stringify(user);
    userData = userResponse;
    sessionStorage.setItem("currentUser", userResponse);
    hasUser(userData);
    getByClerkId(userData);
  }

  async function getByClerkId(userData: any) {
    userData = JSON.parse(userData);

    const response = await axios
      .get(`http://localhost:3000/api/users/${userData.id}/currentUser`)
      .then((response) => {
        setRole(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getAll() {
    const response = await axios
      .get("http://localhost:3000/api/users/")
      .then((response) => {
        setUsers(response.data!);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return response.data;
  }

  async function createUser(userData: any) {
    const response = await axios
      .post("http://localhost:3000/api/users/", {
        name: `${userData.firstName!} ${userData.lastName!}`,
        userClerkId: userData.id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    return response;
  }

  async function hasUser(userData: any) {
    if (userData) {
      const usuarios = await getAll();
      console.log(usuarios.data);

      userData = JSON.parse(userData);
      const hasUser = userData.id.includes(usuarios.data!);
      if (!hasUser) {
        await createUser(userData);
      }
    }
  }

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
