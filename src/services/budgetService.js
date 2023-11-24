import api from "./api";

export async function getBudgetListRequest() {
  return await api.get("listBudgets");
}

export async function getBudgetByIdRequest(bikeId) {
  return await api.get("listBudgetById?id=" + bikeId);
}

export async function filterBudgetListRequest(word, statusId) {
  return await api.get(
    "filterListBudgets?word=" + word + "&statusId=" + statusId
  );
}

export async function addBudgetRequest(
  clientId,
  plate,
  bikeName,
  bikeBrand,
  year,
  paymentFormat,
  kilometersDriven,
  laborOrBikePartBudgetList,
  discountPercentage,
  status,
  notes,
  problems
) {
  return await api.post("addBudget", {
    clientId: clientId,
    plate: plate,
    bikeName: bikeName,
    bikeBrand: bikeBrand,
    year: year,
    paymentFormat: paymentFormat,
    kilometersDriven: kilometersDriven,
    laborOrBikePartBudgetList: laborOrBikePartBudgetList,
    discountPercentage: discountPercentage,
    status: status,
    notes: notes,
    problems: problems,
  });
}

export async function editBudgetRequest(
  id,
  kilometersDriven,
  paymentFormat,
  laborOrBikePartBudgetList,
  discountPercentage,
  status,
  notes,
  problems
) {
  return await api.post("editBudget", {
    id: id,
    kilometersDriven: kilometersDriven,
    paymentFormat: paymentFormat,
    laborOrBikePartBudgetList: laborOrBikePartBudgetList,
    discountPercentage,
    status: status,
    notes: notes,
    problems: problems,
  });
}

export async function getClientByBudgetIdRequest(budgetId) {
  return await api.get("findClientByBudgetId?budgetId=" + budgetId);
}

export async function removeBudgetByIdRequest(id) {
  return await api.put("removeBudgetById?budgetId=" + id);
}

export async function editBudgetNotesRequest(id, notes) {
  return await api.put("editBudgetNotesById", {
    id: id,
    notes: notes,
  });
}

export async function getLaborOrBikePartByName(name) {
  return await api.get("findLaborOrBikePartByName?name=" + name);
}

export async function getListBudgetByClientIdRequest(clientId) {
  return await api.get("listBudgetByClientId?clientId=" + clientId);
}

export async function getBudgetHistoryByBikePartIdRequest(bikePartId) {
  return await api.get("getBudgetHistoryByBikePartId?bikePartId=" + bikePartId);
}
