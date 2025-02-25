import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { getRecipeById } from "../services/recipes";
const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { recipeId } = useParams();

  const loadRecipe = async () => {
    try {
      setIsLoading(true);
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    recipeId && loadRecipe();
  }, [recipeId]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {isLoading ? (
        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          Loading...
        </p>
      ) : error ? (
        <p
          style={{
            color: "#ff0000",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      ) : recipe ? (
        <div>
          <h2
            style={{
              color: "#333",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1.5rem",
              borderBottom: "2px solid #e0e0e0",
              paddingBottom: "10px",
            }}
          >
            {recipe?.title}
          </h2>

          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            <div>
              <h3
                style={{
                  color: "#2c3e50",
                  marginBottom: "10px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Ingredients
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  color: "#34495e",
                }}
              >
                {recipe?.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                style={{
                  color: "#2c3e50",
                  marginBottom: "10px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Instructions
              </h3>
              <p
                style={{
                  color: "#34495e",
                  lineHeight: "1.6",
                }}
              >
                {recipe?.instructions}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#f1f1f1",
                padding: "15px",
                borderRadius: "6px",
              }}
            >
              <div>
                <span
                  style={{
                    color: "#2c3e50",
                    fontWeight: "bold",
                  }}
                >
                  Preparation Time:
                </span>
                <span
                  style={{
                    marginLeft: "10px",
                    color: "#34495e",
                  }}
                >
                  {recipe?.preparationTime}
                </span>
              </div>

              <div>
                <div>
                  <span
                    style={{
                      color: "#2c3e50",
                      fontWeight: "bold",
                      marginLeft: "15px",
                    }}
                  >
                    Difficulty:
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      color: "#34495e",
                    }}
                  >
                    {recipe?.difficulty}
                  </span>
                </div>
              </div>

              <div>
                <div>
                  <span
                    style={{
                      color: "#2c3e50",
                      fontWeight: "bold",
                      marginLeft: "15px",
                    }}
                  >
                    Is Kosher:
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      color: "#34495e",
                    }}
                  >
                    {recipe?.isKosher ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Recipe Not Found</h2>
      )}
      <Link to={`/recipes`}>View All</Link>
    </div>
  );
};

export default RecipeDetails;
