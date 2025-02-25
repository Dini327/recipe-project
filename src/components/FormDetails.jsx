import { useState } from "react";
import { FORM_MODES_OPTIONS } from "./RecipeContainer";

const DIFFICULTY_OPTIONS = { Easy: "Easy", Medium: "Medium", Hard: "Hard" };

const FormDetails = ({ selectedRecipe, onSubmit, onCancel, formMode }) => {
  const [title, setTitle] = useState(selectedRecipe?.title || "");
  const [ingredients, setIngredients] = useState(
    selectedRecipe?.ingredients || []
  );
  const [instructions, setInstructions] = useState(
    selectedRecipe?.instructions || ""
  );

  const [preparationTime, setPreparationTime] = useState(
    selectedRecipe?.preparationTime || undefined
  );
  const [difficulty, setDifficulty] = useState(
    selectedRecipe?.difficulty || DIFFICULTY_OPTIONS.Easy
  );
  const [isKosher, setIsKosher] = useState(selectedRecipe?.isKosher || false);

  const updateIngredient = (index, value) => {
    setIngredients((prevIngredients) => prevIngredients.with(index, value));
  };
  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (indexToRemove, e) => {
    e.preventDefault();
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const reciptDetails = {
      ...selectedRecipe,
      title,
      ingredients,
      instructions,
      preparationTime,
      difficulty,
      isKosher,
    };
    onSubmit(reciptDetails);
    setTitle("");
    setIngredients([]);
    setInstructions("");
    setPreparationTime(1);
    setDifficulty(DIFFICULTY_OPTIONS.Easy);
    setIsKosher(false);
  };

  const handleCancel = () => {
    setTitle("");
    setIngredients([]);
    setInstructions("");
    setPreparationTime(1);
    setDifficulty(DIFFICULTY_OPTIONS.Easy);
    setIsKosher(false);
    onCancel();
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Recipe Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                style={{
                  flexGrow: 1,
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={(e) => removeIngredient(index, e)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                -
              </button>
            </div>
          ))}
          <button
            onClick={addIngredient}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
        <div>
          <textarea
            type="text"
            placeholder="Recipe Instructions"
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Preparation Time"
            onChange={(e) => setPreparationTime(e.target.value)}
            value={preparationTime}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            {Object.values(DIFFICULTY_OPTIONS).map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Is Kosher</label>
          <input
            type="checkbox"
            checked={isKosher}
            onChange={(e) => setIsKosher(e.target.checked)}
          />
        </div>
        <div>
          <button type="submit">
            {formMode === FORM_MODES_OPTIONS.Create
              ? "Create"
              : formMode === FORM_MODES_OPTIONS.Edit && "Update"}
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default FormDetails;
