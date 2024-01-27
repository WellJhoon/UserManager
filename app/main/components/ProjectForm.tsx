"use client";
import { Button } from "@/components/ui/button";

import { useProjectForm } from "@/utils/useForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { Project, User } from "@/types/Project";
import { object, string, array } from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

export const ProjectForm = () => {
  const form = useProjectForm();
  const [open, setOpen] = useState(false);
  const [usersSelect, setUsersSelect] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const owner = sessionStorage.getItem("currentUser");
  const ownerData = JSON.parse(owner!);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    const response = await axios
      .get("http://localhost:3000/api/users/")
      .then((response) => {
        setUsers(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return response.data;
  }

  const create = async (value: Partial<Project>) => {
    try {
      const response = await axios.post("http://localhost:3000/api/projects", {
        projectName: value.projectName,
        description: value.description,
        ownerId: "",
        usersSelect,
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  const validationSchema = object({
    name: string().required(),
    description: string().required(),
    selectedUsers: array(),
    owner: string().required(),
  });


  const close = () => {};
  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 pt-2 border-r-2 pb-2">
        <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-6">Add Project Form</h1>
          <Formik
            initialValues={{
              projectName: "",
              description: "",
              owner: `${ownerData.firstName} ${ownerData.lastName}`,
            }}
            validationSchema={validationSchema}
            onSubmit={async (value: Partial<Project>) => {
              
              create(value);
              window.location.reload();
            }}
          >
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="projectName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Project Name:
                </label>
                <Field
                  type="text"
                  id="projectName"
                  name="projectName"
                  className="border rounded w-full py-2 px-3"
                />
                <ErrorMessage
                  name="projectName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description:
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="owner"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Owner:
                </label>

                <Field
                  as="input"
                  name="owner"
                  id="owner"
                  className="border rounded w-full py-2 px-3"
                  disabled
                />
                <ErrorMessage
                  name="owner"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="selectedUsers"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Select Members:
                </label>
                <Field
                  as="select"
                  multiple
                  name="selectedUsers"
                  className="border rounded w-full py-2 px-3"
                >
                  {users.map((user) => (
                    <>
                      {user.userClerkId != ownerData.id && (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      )}
                    </>
                  ))}
                </Field>
                <ErrorMessage
                  name="selectedUsers"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-x-2">
                <button 
                  
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={form.onClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
