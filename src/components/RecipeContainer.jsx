import { useEffect, useState } from "react";
import {
  getAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../services/recipes";
import FormDetails from "./FormDetails";
import RecipeList from "./RecipeList";

export const FORM_MODES_OPTIONS = {
  None: "None",
  Create: "Create",
  Edit: "Edit",
};

const RecipeContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState(FORM_MODES_OPTIONS.None);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      setLoading(true);
      const response = await getAllRecipes();
      setRecipes(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormMode(FORM_MODES_OPTIONS.None);
    setSelectedRecipe(null);
  };

  const handleFormSubmit = async (recipe) => {
    if (formMode === FORM_MODES_OPTIONS.Create) {
      insertRecipe(recipe);
    } else {
      editRecipe(recipe);
    }
    setFormMode(FORM_MODES_OPTIONS.None);
  };

  const insertRecipe = async (recipe) => {
    try {
      const response = await createRecipe(recipe);
      setRecipes([...recipes, response]);
    } catch (error) {
      setError(error);
    }
  };

  const editRecipe = async (recipe) => {
    try {
      const updatedRecipe = await updateRecipe(recipe._id, recipe);
      const updatedRecipeList = recipes.map((r) => {
        if (r._id === recipe._id) {
          return updatedRecipe;
        }
        return r;
      });
      setRecipes(updatedRecipeList);
    } catch (error) {
      setError(error);
    }
  };

  const handleRecipeEdit = (selectedRecipe) => {
    setFormMode(FORM_MODES_OPTIONS.Edit);
    setSelectedRecipe(selectedRecipe);
  };

  const handleRecipeDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div>
          {formMode !== FORM_MODES_OPTIONS.None ? (
            <FormDetails
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              selectedRecipe={selectedRecipe}
              formMode={formMode}
            />
          ) : (
            <div>
              <button onClick={() => setFormMode(FORM_MODES_OPTIONS.Create)}>
                Add Recipe
              </button>
              <RecipeList
                onEdit={handleRecipeEdit}
                onDelete={handleRecipeDelete}
                recipes={recipes}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeContainer;
