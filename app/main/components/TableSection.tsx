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

import { Project } from "@/types/Project";
import axios from "axios";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useEdit } from "@/utils/useEdit";

const TableSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deleteId, setDeleteId] = useState(null);
  const projectsPerPage = 5; // Número de proyectos por página
  const edit = useEdit();

  const handleEditClick = (project: Project) => {
    edit.onOpen(project);
  };
  const handleDeleteClick = async (id: any) => {
    setDeleteId(id);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/projects/${id}`
      );
      getTableData();
      console.log(response.data); // Maneja la respuesta según tus necesidades
    } catch (error) {
      console.error(error);
    }
  };

  const getTableData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/projects/`);
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  // Filtra y pagine los proyectos según el término de búsqueda y la página actual
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects
    .filter((project) =>
      Object.values(project).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstProject, indexOfLastProject);

  // Cambia a la página siguiente
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Calcula el número total de páginas
  const totalPages = Math.ceil(
    projects.filter((project) =>
      Object.values(project).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ).length / projectsPerPage
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
                placeholder="Search projects..."
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
            <TableHead className="max-w-[150px]">ID</TableHead>
              <TableHead className="max-w-[150px]">Description</TableHead>
              <TableHead className="hidden md:table-cell">
                Project Name
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProjects.map((project) => (
              <TableRow key={project.id}>
                 <TableCell>{project.id}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell className="flex space-x-">
                  <Button
                    onClick={() => handleEditClick(project)}
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeleteClick(project?.id);
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
      {/*Termina Aqui */}
    </>
  );
};

export default TableSection;
