import api from "./api";

export async function getReportDataRequest(year) {
  return await api.get("getReportData?year=" + year);
}
