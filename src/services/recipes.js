import axios from "axios";

export const getAllRecipes = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/recipes");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createRecipe = async (recipe) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/recipes",
      recipe
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateRecipe = async (id, recipe) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/recipes/${id}`,
      recipe
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteRecipe = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/recipes/${id}`);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
