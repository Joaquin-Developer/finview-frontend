import api from "./client";

export const getSummary = async () => {
  const { data } = await api.get("/stats/summary");
  return data;
};

export const getByMonth = async (months = 6) => {
  const { data } = await api.get(`/stats/by-month?months=${months}`);
  return data;
};

export const getByCategory = async (period = "all") => {
  const { data } = await api.get(`/stats/by-category?period=${period}`);
  return data;
};

export const getByBank = async () => {
  const { data } = await api.get("/stats/by-bank");
  return data;
};

export const getTopMerchants = async (limit = 10) => {
  const { data } = await api.get(`/stats/top-merchants?limit=${limit}`);
  return data;
};

export const getTrends = async (days = 30) => {
  const { data } = await api.get(`/stats/trends?days=${days}`);
  return data;
};

export const getTransactions = async (params = {}) => {
  const { data } = await api.get("/transactions", { params });
  return data;
};
