import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ margin: "20px 0", display: "flex", gap: "20px" }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/careers">Careers</Link>
    </nav>
  );
};

export default Navbar;