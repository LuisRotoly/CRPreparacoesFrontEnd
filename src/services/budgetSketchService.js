import api from "./api";

export async function getBudgetSketchListRequest() {
  return await api.get("listBudgetsSketch");
}

export async function getBudgetSketchByIdRequest(bikeId) {
  return await api.get("listBudgetSketchById?id=" + bikeId);
}

export async function filterBudgetSketchListRequest(word) {
  return await api.get("filterListBudgetsSketch?word=" + word);
}

export async function addBudgetSketchRequest(
  client,
  plate,
  bike,
  phone,
  laborOrBikePartBudgetSketchList,
  notes
) {
  return await api.post("addBudgetSketch", {
    client: client,
    plate: plate,
    bike: bike,
    phone: phone,
    laborOrBikePartBudgetSketchList: laborOrBikePartBudgetSketchList,
    notes: notes,
  });
}

export async function editBudgetSketchRequest(
  id,
  client,
  plate,
  bike,
  phone,
  laborOrBikePartBudgetSketchList,
  notes
) {
  return await api.post("editBudgetSketch", {
    id: id,
    plate: plate,
    bike: bike,
    phone: phone,
    laborOrBikePartBudgetSketchList: laborOrBikePartBudgetSketchList,
    notes: notes,
  });
}

export async function removeBudgetSketchByIdRequest(id) {
  return await api.put("removeBudgetSketchById?budgetSketchId=" + id);
}
