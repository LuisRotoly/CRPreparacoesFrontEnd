import api from "./api";

export async function getBikeBrandListRequest() {
  return await api.get("listBikeBrands");
}

export async function addBikeBrandRequest(name) {
  return await api.post("addBikeBrand", {
    name: name,
  });
}
