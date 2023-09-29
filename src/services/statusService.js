import api from "./api";

export async function getStatusListRequest() {
  return await api.get("listStatus");
}
