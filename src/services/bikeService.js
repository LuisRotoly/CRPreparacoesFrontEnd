import api from "./api";

export async function getBikeListRequest() {
  return await api.get("listBikes");
}

export async function getBikeByIdRequest(bikeId) {
  return await api.get("listBikeById?id=" + bikeId);
}

export async function filterBikeListRequest(word) {
  return await api.get("filterListBikes?word=" + word);
}

export async function addBikeRequest(name, brandId, engineCapacity, year) {
  return await api.post("addBike", {
    name: name,
    brandId: brandId,
    engineCapacity: engineCapacity,
    year: year,
  });
}

export async function editBikeRequest(id, name, brandId, engineCapacity, year) {
  return await api.post("editBike", {
    id: id,
    name: name,
    brandId: brandId,
    engineCapacity: engineCapacity,
    year: year,
  });
}
