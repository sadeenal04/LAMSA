import { Link } from "react-router-dom";
import "../../index.css";
function Navbar({ style }) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light lamsa-navbar"
      style={style}
    >
      <div className=" px-5 py-3 d-flex align-items-center w-100">
        <a className="navbar-brand lamsa-brand" href="#">
          LAMSA
        </a>
        <div className=" ms-auto d-flex gap-4">
          <Link to="/" className="nav-link" href="#">
            Home
          </Link>

          <Link to="/explore" className="nav-link">
            Explore
          </Link>
          <Link to="/create" className="nav-link">
            Create
          </Link>
          <a className="nav-link" href="#">
            Contact
          </a>

          <a className="nav-link" href="#">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
