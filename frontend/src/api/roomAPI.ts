import api from "./api";

async function getRooms() {
  const res = await api.get(`/rooms`);
  return res.data;
}

export { getRooms };