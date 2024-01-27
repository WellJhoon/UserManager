/* eslint-disable react/jsx-key */
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { User } from "@/types/Project";
import axios from "axios";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useEdit } from "@/utils/useEdit";
import { useRouter } from "next/navigation";

const TableSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const usersPerPage = 5; // Número de proyectos por página
  const edit = useEdit();
  const router = useRouter();
  const handleEditClick = (user: User) => {
    edit.onOpen(user);
  };
  const handleDeleteClick = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/${id}`
      );
      getTableData();
      console.log(response.data); // Maneja la respuesta según tus necesidades
    } catch (error) {
      console.error(error);
    }
  };

  const getTableData = async () => {
    try {
      const response = await axios.get<User[]>(
        "http://localhost:3000/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  // Filtra y pagine los proyectos según el término de búsqueda y la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter((project) =>
      Object.values(project).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstUser, indexOfLastUser);

  // Cambia a la página siguiente
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Calcula el número total de páginas
  const totalPages = Math.ceil(
    users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ).length / usersPerPage
  );

  // Cambia a la página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="border shadow-sm rounded-lg pb-3 ">
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Input
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                placeholder="Search users..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Creation date</TableHead>
              <TableHead>ProjectId</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="font-medium">{user.createdAt}</TableCell>
                <TableCell className="font-medium">{user.projectId}</TableCell>
                <TableCell className="flex space-x-">
                  <Button
                    onClick={() => handleEditClick(user)}
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeleteClick(user?.id);
                    }}
                    variant="outline"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr />
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={prevPage} />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={index + 1 === currentPage}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={nextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default TableSection;
