import api from "./api";

export async function getBudgetListRequest() {
  return await api.get("listBudgets");
}

export async function getBudgetByIdRequest(bikeId) {
  return await api.get("listBudgetById?id=" + bikeId);
}

export async function filterBudgetListRequest(word) {
  return await api.get("filterListBudgets?word=" + word);
}

export async function addBudgetRequest(
  clientId,
  plate,
  bikeName,
  bikeBrand,
  engineCapacity,
  year,
  laborOrBikePartBudgetList,
  status,
  totalValue
) {
  return await api.post("addBudget", {
    clientId: clientId,
    plate: plate,
    bikeName: bikeName,
    bikeBrand: bikeBrand,
    engineCapacity: engineCapacity,
    year: year,
    laborOrBikePartBudgetList: laborOrBikePartBudgetList,
    status: status,
    totalValue: totalValue,
  });
}

export async function editBudgetRequest(id, status) {
  return await api.post("editBudget", {
    id: id,
    status: status,
  });
}
