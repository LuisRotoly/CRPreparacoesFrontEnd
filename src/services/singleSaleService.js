import api from "./api";

export async function addSingleSaleRequest(client, laborOrBikePartList) {
  return await api.post("addSingleSale", {
    client: client,
    laborOrBikePartList: laborOrBikePartList,
  });
}

export async function getSingleSaleHistoryByBikePartIdRequest(bikePartId) {
  return await api.get(
    "getSingleSaleHistoryByBikePartId?bikePartId=" + bikePartId
  );
}
