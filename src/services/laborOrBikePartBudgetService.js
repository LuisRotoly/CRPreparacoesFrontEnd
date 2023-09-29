import api from "./api";

export async function listLaborOrBikePartBudgetByIdRequest(budgetId) {
  return await api.get("listLaborOrBikePartBudgetById?budgetId=" + budgetId);
}

export async function addLaborOrBikePartBudgetRequest(laborOrBikePartBudget) {
  return await api.post("addLaborOrBikePartBudget", {
    laborOrBikePartBudget: laborOrBikePartBudget,
  });
}

export async function removeLaborOrBikePartBudgetRequest(id) {
  return await api.delete("removeLaborOrBikePartBudget?id=" + id);
}
