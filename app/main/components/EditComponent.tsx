import { Form } from "@/components/ui/form";
import { useEdit } from "@/utils/useEdit";
import { useProjectForm } from "@/utils/useForm";
import axios from "axios";
import { useState } from "react";

export const EditComponent = () => {
  const edit = useEdit();

  const [inputValue, setInputValue] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [name, setName] = useState<string>(edit.project?.name || "");
  const [owner, setOwner] = useState<string>(edit.project?.owner || "");
  const [description, setDescription] = useState<string>(
    edit.project?.description || ""
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setMembers((prevValues) => [...prevValues, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      name: name,
      description: description,
      owner: owner,
      members: members,
    };

    const updatedProject = {
      name: name,
      description: description,
      owner: owner,
      members: members,
    };

    console.log(newProject);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/projects/${edit.project?.id}`,
        updatedProject
      );
      return response.data;
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className=" flex items-center justify-center bg-gray-50 pt-2 border-r-2 pb-2">
        <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-6">Formulario React</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                name="name"
                value={name}
                // defaultValue={edit.project?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                className="border rounded w-full py-2 px-3"
                name="description"
                value={description}
                // defaultValue={edit.project?.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Owner:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                name="owner"
                value={owner}
                // defaultValue={edit.project?.owner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Member
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                name="members"
                value={inputValue}
                onKeyDown={handleKeyPress}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-x-2">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded spa"
                type="submit"
              >
                Submit
              </button>

              <button
                onClick={edit.onClose}
                className="bg-red-500 text-white py-2 px-4 rounded"
                type="submit"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditComponent;
