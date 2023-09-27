import api from "./api";

export async function getBikePartListRequest() {
  return await api.get("listBikeParts");
}

export async function getBikePartByIdRequest(bikePartId) {
  return await api.get("listBikePartById?id=" + bikePartId);
}

export async function getBikePartByPlateRequest(plate) {
  return await api.get("listBikePartByPlate?plate=" + plate);
}

export async function filterBikePartListRequest(word) {
  return await api.get("filterListBikeParts?word=" + word);
}

export async function addBikePartRequest(name, value, stockQuantity, bikeId) {
  return await api.post("addBikePart", {
    name: name,
    value: value,
    stockQuantity: stockQuantity,
    bikeId: bikeId,
  });
}

export async function editBikePartRequest(
  id,
  name,
  value,
  stockQuantity,
  bikeId
) {
  return await api.post("editBikePart", {
    id: id,
    name: name,
    value: value,
    stockQuantity: stockQuantity,
    bikeId: bikeId,
  });
}
