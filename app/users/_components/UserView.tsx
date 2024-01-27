import { ErrorMessage, Field, Form, Formik } from "formik";
import { Project, User } from "@/types/Project";
import { Button } from "@/components/ui/button";
import { useUserForm } from "@/utils/useForm";
import { useState, useEffect } from "react";
import { object, string, array, number } from "yup";
import axios from "axios";

export const UserView = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const form = useUserForm();

  useEffect(() => {
    getProjectsData();
  }, []);

  const getProjectsData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/projects/`);
      setProjects(response.data);

    } catch (error) {
      console.error(error);
    }
  };

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

  const insert = async (value: { id: number, userId: number }) => {
    const response = await axios
    .post(`http://localhost:3000/api/projects/${value.id}/asignUser/${value.userId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  return response;

  };
  
  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 pt-2 border-r-2 pb-2">
        <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-6">Add User To Project</h1>
          <Formik
            initialValues={}
            validationSchema={validationSchema}
            onSubmit={async (value: { userId: number , projectId: number }) => {
              insert(value);
            }}
          >
            <Form>
            <div className="mb-4">
                <label
                  htmlFor="userId"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Select User:
                </label>
                <Field
                  as="select"
                  name="userId"
                  className="border rounded w-full py-2 px-3"
                >
                  {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="userId"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="id"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Select Projects:
                </label>
                <Field
                  as="select"
                  name="id"
                  className="border rounded w-full py-2 px-3"
                >
                  {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="id"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-x-2">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() => form.onClose}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

const validationSchema = object({
  id: number().required(),
  userId: number().required(),
});