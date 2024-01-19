import api from "./api";

export async function getBikePartListRequest() {
  return await api.get("listBikeParts");
}

export async function getBikePartByIdRequest(bikePartId) {
  return await api.get("listBikePartById?id=" + bikePartId);
}

export async function filterBikePartListRequest(word) {
  return await api.get("filterListBikeParts?word=" + word);
}

export async function addBikePartRequest(
  name,
  value,
  profitPercentage,
  stockQuantity,
  notes
) {
  return await api.post("addBikePart", {
    name: name,
    value: value,
    profitPercentage: profitPercentage,
    stockQuantity: stockQuantity,
    notes: notes,
  });
}

export async function editBikePartRequest(
  id,
  name,
  value,
  profitPercentage,
  notes,
  stockQuantity
) {
  return await api.post("editBikePart", {
    id: id,
    name: name,
    value: value,
    profitPercentage: profitPercentage,
    notes: notes,
    stockQuantity: stockQuantity,
  });
}

export async function editBikePartStockRequest(id, stockQuantity) {
  return await api.post("editBikePartStock", {
    id: id,
    stockQuantity: stockQuantity,
  });
}
