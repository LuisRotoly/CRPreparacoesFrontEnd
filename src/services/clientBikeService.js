import api from "./api";

export async function listClientBikeById(clientId) {
  return await api.get("listClientBikeById?clientId=" + clientId);
}

export async function getBikeByPlateRequest(plate) {
  return await api.get("listBikeByPlate?plate=" + plate);
}
