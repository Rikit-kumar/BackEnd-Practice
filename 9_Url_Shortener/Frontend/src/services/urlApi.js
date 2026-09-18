import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const urlService = {
  shorten: async (originalUrl) => {
    const res = await api.post("/url", { url: originalUrl });
    return res.data;
  },

  getAll: async () => {
    const res = await api.get("/url/all");
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/${id}`);
    return res.data;
  },
};
