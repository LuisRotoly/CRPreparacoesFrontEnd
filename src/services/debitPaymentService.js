import api from "./api";

export async function getCashHandlingListByDate(date) {
  return await api.get("getCashHandlingListByDate?date=" + date);
}

export async function removeDebitPaymentByIdRequest(id) {
  return await api.delete("removeDebitPaymentById?id=" + id);
}

export async function addDebitPaymentRequest(
  description,
  notes,
  paymentValue,
  paymentFormat
) {
  return await api.post("addDebitPayment", {
    description: description,
    notes: notes,
    paymentValue: paymentValue,
    paymentFormat: paymentFormat,
  });
}

export async function getCashHandlingExistentYear() {
  return await api.get("getCashHandlingExistentYear");
}

export async function getCashHandlingListByYearAndMonth(year, month) {
  return await api.get(
    "getCashHandlingListByYearAndMonth?year=" + year + "&month=" + month
  );
}
