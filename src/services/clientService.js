import api from "./api";

export async function getClientsListRequest() {
  return await api.get("listClients");
}

export async function getClientByIdRequest(clientId) {
  return await api.get("listClientById?id=" + clientId);
}

export async function filterClientsListRequest(word) {
  return await api.get("filterListClients?word=" + word);
}

export async function addClientRequest(
  name,
  cpfcnpj,
  address,
  phone,
  nickname,
  clientBikeList
) {
  return await api.post("addClient", {
    name: name,
    cpfcnpj: cpfcnpj,
    address: address,
    phone: phone,
    nickname: nickname,
    clientBikeList: clientBikeList,
  });
}

export async function editClientRequest(
  id,
  name,
  cpfcnpj,
  address,
  phone,
  nickname,
  clientBikeList
) {
  return await api.post("editClient", {
    id: id,
    name: name,
    cpfcnpj: cpfcnpj,
    address: address,
    phone: phone,
    nickname: nickname,
    clientBikeList: clientBikeList,
  });
}
