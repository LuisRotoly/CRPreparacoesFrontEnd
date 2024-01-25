import api from "./api";

export async function getGrossIncomeDataRequest(year) {
  return await api.get("getGrossIncomeData?year=" + year);
}

export async function getNetRevenueDataRequest(year) {
  return await api.get("getNetRevenueData?year=" + year);
}

export async function getBikePartSpentDataRequest(year) {
  return await api.get("getBikePartSpentData?year=" + year);
}
