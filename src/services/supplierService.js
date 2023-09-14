import api from "./api";

export async function getSuppliersListRequest() {
  return await api.get("listSuppliers");
}

export async function getSupplierByIdRequest(clientId) {
  return await api.get("listSupplierById?id=" + clientId);
}

export async function filterSupplierListRequest(word) {
  return await api.get("filterListSuppliers?word=" + word);
}

export async function addSupplierRequest(name, phone, notes) {
  return await api.post("addSupplier", {
    name: name,
    phone: phone,
    notes: notes,
  });
}

export async function editSupplierRequest(id, name, phone, notes) {
  return await api.post("editSupplier", {
    id: id,
    name: name,
    phone: phone,
    notes: notes,
  });
}
