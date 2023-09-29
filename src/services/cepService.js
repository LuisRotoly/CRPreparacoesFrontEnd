import api from "./api";

export async function getCepRequest(cep) {
  return await api.get("https://viacep.com.br/ws/" + cep + "/json/");
}
