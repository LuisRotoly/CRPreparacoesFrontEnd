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
  payment,
  kilometers,
  laborOrBikePartBudgetList,
  status,
  notes
) {
  return await api.post("addBudget", {
    clientId: clientId,
    plate: plate,
    bikeName: bikeName,
    bikeBrand: bikeBrand,
    engineCapacity: engineCapacity,
    year: year,
    payment: payment,
    kilometers: kilometers,
    laborOrBikePartBudgetList: laborOrBikePartBudgetList,
    status: status,
    notes: notes,
  });
}

export async function editBudgetRequest(
  id,
  payment,
  laborOrBikePartBudgetList,
  status,
  notes
) {
  return await api.post("editBudget", {
    id: id,
    payment: payment,
    laborOrBikePartBudgetList: laborOrBikePartBudgetList,
    status: status,
    notes: notes,
  });
}

export async function getClientByBudgetIdRequest(budgetId) {
  return await api.get("findClientByBudgetId?budgetId=" + budgetId);
}
