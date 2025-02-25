import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  return (
    <div>
      {recipes.map((recipe) =>(
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={onDelete}
        />
     ))}
    </div>
  );
};

export default RecipeList;
