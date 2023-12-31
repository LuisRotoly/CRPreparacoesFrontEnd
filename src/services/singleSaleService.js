import api from "./api";

export async function addSingleSaleRequest(client, singleSaleRelBikePartList) {
  return await api.post("addSingleSale", {
    client: client,
    singleSaleRelBikePartList: singleSaleRelBikePartList,
  });
}

export async function getSingleSaleHistoryByBikePartIdRequest(bikePartId) {
  return await api.get(
    "getSingleSaleHistoryByBikePartId?bikePartId=" + bikePartId
  );
}

export async function getSingleSaleByIdRequest(singleSaleId) {
  return await api.get("getSingleSaleById?singleSaleId=" + singleSaleId);
}
