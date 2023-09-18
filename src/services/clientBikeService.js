import api from "./api";

export async function listClientBikeById(clientId) {
  return await api.get("listClientBikeById?clientId=" + clientId);
}
