import {
  useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import { useAuthStore } from "../store/authStore";

import api from "../services/api";

interface Props {
  refreshLeads: () => void;
}

interface LeadFormData {
  name: string;

  email: string;

  status: string;

  source: string;
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
  } = useForm<LeadFormData>();

  const onSubmit = async (
    data: LeadFormData
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
        "Lead created successfully"
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
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-5">
        Create New Lead
      </h2>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <input
          type="text"
          placeholder="Lead Name"
          {...register("name")}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Lead Email"
          {...register("email")}
          className="p-3 border rounded-lg"
          required
        />

        <select
          {...register("status")}
          defaultValue="new"
          className="p-3 border rounded-lg"
        >
          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="qualified">
            Qualified
          </option>

          <option value="converted">
            Converted
          </option>

          <option value="lost">
            Lost
          </option>
        </select>

        <select
          {...register("source")}
          defaultValue="website"
          className="p-3 border rounded-lg"
        >
          <option value="website">
            Website
          </option>

          <option value="facebook">
            Facebook
          </option>

          <option value="linkedin">
            LinkedIn
          </option>

          <option value="instagram">
            Instagram
          </option>

          <option value="referral">
            Referral
          </option>
        </select>

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white py-3 rounded-lg col-span-1 md:col-span-2 lg:col-span-4"
        >
          Create Lead
        </button>
      </form>
    </div>
  );
};

export default CreateLeadForm;