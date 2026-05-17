import api from "./api";

export const getLeads = async (
  token: string,
  page = 1,
  search = "",
  status = ""
) => {
  const response = await api.get(
    `/leads?page=${page}&search=${search}&status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteLead = async (
  id: string,
  token: string
) => {
  const response = await api.delete(
    `/leads/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const exportCSV = async (
  token: string
) => {
  const response = await api.get(
    "/leads/export/csv",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      responseType: "blob",
    }
  );

  return response.data;
};