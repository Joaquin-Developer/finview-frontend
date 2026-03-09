import api from "./client";

export const listCategories = async () => {
  const { data } = await api.get("/categories/");
  return data;
};

export const seedCategories = async (categories) => {
  const { data } = await api.post("/categories/seed", categories);
  return data;
};

export const createCategory = async (category) => {
  const { data } = await api.post("/categories/", category);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};

