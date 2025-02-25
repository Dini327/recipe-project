import { Link } from "react-router";

const Header = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "black",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100vW",
      }}
    >
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/recipes">Recipes</Link>
      </div>
    </nav>
  );
};

export default Header;
