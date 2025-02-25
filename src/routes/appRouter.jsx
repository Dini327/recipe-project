import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import HomePage from "../components/HomePage";
import NotFound from "../components/NotFound";
import RecipeContainer from "../components/RecipeContainer";
import RecipeDetails from "../components/RecipeDetails";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: "recipes",
        children: [
          { index: true, element: <RecipeContainer /> },
          { path: ":recipeId", element: <RecipeDetails /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
