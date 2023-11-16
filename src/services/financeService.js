import api from "./api";

export async function getFinanceBudgetListRequest() {
  return await api.get("listFinanceBudgets");
}

export async function getFinanceBudgetByIdRequest(budgetId) {
  return await api.get("listFinanceBudgetById?id=" + budgetId);
}

export async function filterFinanceBudgetListRequest(word, isInDebit) {
  return await api.get(
    "filterFinanceBudgetListRequest?word=" + word + "&isInDebit=" + isInDebit
  );
}

export async function getPaymentsListRequest(budgetId) {
  return await api.get("getPaymentsListById?id=" + budgetId);
}

export async function removePaymentByIdRequest(financeBudgetId) {
  return await api.delete("removePaymentById?id=" + financeBudgetId);
}

export async function addPaymentRequest(
  budgetId,
  paymentValue,
  paymentFormat,
  notes
) {
  return await api.post("addPayment", {
    budgetId: budgetId,
    paymentValue: paymentValue,
    paymentFormat: paymentFormat,
    notes: notes,
  });
}

export async function getToBePaidRequest(budgetId) {
  return await api.get("getToBePaidById?id=" + budgetId);
}

export async function getTotalToReceiveRequest() {
  return await api.get("getTotalToReceive");
}
