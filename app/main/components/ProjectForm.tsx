import { Form } from "@/components/ui/form";
import { useProjectForm } from "@/utils/useForm";
import axios from "axios";
import { useState } from "react";

export const ProjectForm = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const form = useProjectForm();

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
    if (event.key === "Enter") {
      event.preventDefault();
      setMembers((prevValues) => [...prevValues, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData, members);
    try {
      const response = await axios.post("http://localhost:4000/api/projects", {
        name: formData.name,
        owner: formData.owner,
        description: formData.description,
        members: members,
      });
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
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                className="border rounded w-full py-2 px-3"
                name="description"
                value={formData.description}
                onChange={handleChange}
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
                value={formData.owner}
                onChange={handleChange}
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
                onClick={form.onClose}
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
