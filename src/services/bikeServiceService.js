import api from "./api";

export async function getBikeServiceListRequest() {
  return await api.get("listBikeServices");
}

export async function getBikeServiceByIdRequest(bikeId) {
  return await api.get("listBikeServiceById?id=" + bikeId);
}

export async function filterBikeServiceListRequest(word) {
  return await api.get("filterListBikeServices?word=" + word);
}

export async function addBikeServiceRequest(name, value) {
  return await api.post("addBikeService", {
    name: name,
    value: value,
  });
}

export async function editBikeServiceRequest(id, name, value) {
  return await api.post("editBikeService", {
    id: id,
    name: name,
    value: value,
  });
}

export async function removeBikeService(id) {
  return await api.delete("deleteBikeService?id=" + id);
}
