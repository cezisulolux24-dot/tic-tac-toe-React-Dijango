import api from "./api";

export const authProcess = async (url: string, username: string, password: string) => {
  const res = await api.post(url, { username, password });
  return res.data;
}