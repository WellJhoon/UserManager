import axios from "axios";
import { useState } from "react";
import { useEdit } from "@/utils/useEdit";
import { Project } from "../../../types/Project";

const EditComponent = () => {
  const edit = useEdit();

  const [inputValue, setInputValue] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [name, setName] = useState<string>(edit.project?.projectName || "");
  const [owner, setOwner] = useState<string>(
    edit.project?.projectOwner.toString() || ""
  );
  const [description, setDescription] = useState<string>(
    edit.project?.description || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setMembers((prevValues) => [...prevValues, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const updatedProject = {
      projectName: name,
      description: description,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/projects/${edit.project?.id}`,
        updatedProject
      );

      console.log(response.data);
      // Puedes realizar acciones adicionales después de una actualización exitosa
    } catch (e) {
      console.error(e);
      setError(
        "Hubo un error al actualizar el proyecto. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 pt-2 border-r-2 pb-2">
        <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-6">Edit Form</h1>
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
                onChange={(e) => setOwner(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-x-2">
              <button
                className={`bg-blue-500 text-white py-2 px-4 rounded ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Submit"}
              </button>

              <button
                onClick={edit.onClose}
                className="bg-red-500 text-white py-2 px-4 rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditComponent;
