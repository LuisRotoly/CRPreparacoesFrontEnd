import api from "./api";

export async function getFinanceBudgetListRequest() {
  return await api.get("listFinanceBudgets");
}

export async function getFinanceBudgetByIdRequest(budgetId) {
  return await api.get("listFinanceBudgetById?id=" + budgetId);
}

export async function filterFinanceBudgetListRequest(word, isInDebit, isPaid) {
  return await api.get(
    "filterFinanceBudgetListRequest?word=" +
      word +
      "&isInDebit=" +
      isInDebit +
      "&isPaid=" +
      isPaid
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

export async function getSingleSaleFinanceListRequest() {
  return await api.get("listSingleSaleFinance");
}

export async function getSingleSaleFinanceByIdRequest(singleSaleId) {
  return await api.get("listSingleSaleFinanceById?id=" + singleSaleId);
}

export async function filterSingleSaleFinanceListRequest(word, isInDebit) {
  return await api.get(
    "filterSingleSaleFinanceListRequest?word=" +
      word +
      "&isInDebit=" +
      isInDebit
  );
}

export async function getSingleSalePaymentsListByIdRequest(singleSaleId) {
  return await api.get("getSingleSalePaymentsListById?id=" + singleSaleId);
}

export async function removeSingleSalePaymentByIdRequest(singleSaleFinanceId) {
  return await api.delete(
    "removeSingleSalePaymentById?id=" + singleSaleFinanceId
  );
}

export async function addSingleSalePaymentRequest(
  singleSaleId,
  paymentValue,
  paymentFormat,
  notes
) {
  return await api.post("addSingleSalePayment", {
    singleSaleId: singleSaleId,
    paymentValue: paymentValue,
    paymentFormat: paymentFormat,
    notes: notes,
  });
}

export async function getSingleSaleToBePaidRequest(singleSaleId) {
  return await api.get("getSingleSaleToBePaidById?id=" + singleSaleId);
}

export async function getSingleSaleTotalToReceiveRequest() {
  return await api.get("getSingleSaleTotalToReceive");
}
