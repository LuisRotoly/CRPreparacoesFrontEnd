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

export async function addBikePartRequest(
  name,
  value,
  profitPercentage,
  stockQuantity,
  bikeList
) {
  return await api.post("addBikePart", {
    name: name,
    value: value,
    profitPercentage: profitPercentage,
    stockQuantity: stockQuantity,
    bikeList: bikeList,
  });
}

export async function editBikePartRequest(
  id,
  name,
  value,
  profitPercentage,
  stockQuantity,
  bikeList
) {
  return await api.post("editBikePart", {
    id: id,
    name: name,
    value: value,
    profitPercentage: profitPercentage,
    stockQuantity: stockQuantity,
    bikeList: bikeList,
  });
}

export async function getBikesByBikePartIdRequest(bikePartId) {
  return await api.get("getBikesByBikePartId?bikePartId=" + bikePartId);
}
