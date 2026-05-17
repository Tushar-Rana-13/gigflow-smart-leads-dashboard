import {
  useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import api from "../services/api";

import { useAuthStore } from "../store/authStore";

import type { Lead } from "../types/lead";

interface Props {
  lead: Lead;

  onClose: () => void;

  refreshLeads: () => void;
}

const EditLeadModal = ({
  lead,
  onClose,
  refreshLeads,
}: Props) => {
  const { token } =
    useAuthStore();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: lead.name,

      email: lead.email,

      status: lead.status,

      source: lead.source,
    },
  });

  const onSubmit = async (
    data: any
  ) => {
    try {
      await api.put(
        `/leads/${lead._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Lead updated"
      );

      refreshLeads();

      onClose();
    } catch {
      toast.error(
        "Update failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-5">
          Edit Lead
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <input
            type="text"
            {...register("name")}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            {...register("email")}
            className="w-full p-3 border rounded-lg"
          />

          <select
            {...register("status")}
            className="w-full p-3 border rounded-lg"
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
            className="w-full p-3 border rounded-lg"
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

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-3 rounded-lg"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;