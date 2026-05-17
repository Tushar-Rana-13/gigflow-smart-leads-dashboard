import {
  useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import api from "../services/api";

import { useAuthStore } from "../store/authStore";

interface FormData {
  name: string;

  email: string;

  status: string;

  source: string;
}

interface Props {
  refreshLeads: () => void;
}

const CreateLeadForm = ({
  refreshLeads,
}: Props) => {
  const { token } =
    useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const onSubmit = async (
    data: FormData
  ) => {
    try {
      await api.post(
        "/leads",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Lead created"
      );

      reset();

      refreshLeads();
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create lead"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="bg-white p-5 rounded-xl shadow-md mb-6"
    >
      <h2 className="text-xl font-bold mb-4">
        Create Lead
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="p-3 border rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="p-3 border rounded-lg"
        />

        <select
          {...register("status")}
          className="p-3 border rounded-lg"
        >
          <option value="">
            Select Status
          </option>

          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="converted">
            Converted
          </option>
        </select>

        <select
          {...register("source")}
          className="p-3 border rounded-lg"
        >
          <option value="">
            Select Source
          </option>

          <option value="website">
            Website
          </option>

          <option value="facebook">
            Facebook
          </option>

          <option value="linkedin">
            LinkedIn
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 bg-black text-white px-5 py-2 rounded-lg"
      >
        Create Lead
      </button>
    </form>
  );
};

export default CreateLeadForm;