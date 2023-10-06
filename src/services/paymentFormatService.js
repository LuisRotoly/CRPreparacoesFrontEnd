import api from "./api";

export async function getPaymentFormatListRequest() {
  return await api.get("listPaymentFormat");
}
