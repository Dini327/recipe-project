import { Link } from "react-router";

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  const { _id, title, preparationTime, difficulty, isKosher } = recipe;
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        width: "300px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        <h2
          style={{
            color: "#333",
            marginBottom: "10px",
            fontSize: "1.2rem",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: "#666",
            margin: "5px 0",
          }}
        >
          Preparation Time: {preparationTime}
        </p>
        <p
          style={{
            color: "#666",
            margin: "5px 0",
          }}
        >
          Difficulty: {difficulty}
        </p>
        <p
          style={{
            color: "#666",
            margin: "5px 0",
          }}
        >
          Is Kosher: {isKosher ? "Yes" : "No"}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={() => onEdit(recipe)}
          style={{
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          style={{
            padding: "5px 10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>

      <Link
        to={`/recipes/${_id}`}
        style={{
          display: "block",
          textAlign: "center",
          color: "#1976D2",
          textDecoration: "none",
          marginTop: "10px",
        }}
      >
        View Recipe Details
      </Link>
    </div>
  );
};

export default RecipeCard;
