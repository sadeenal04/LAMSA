import { Link } from "react-router-dom";
import "../../index.css";

function Navbar({ style }) {
  return (
    <nav className="navbar navbar-expand-lg lamsa-navbar" style={style}>
      <div className="container-fluid px-5 py-3">
        <div className="navbar-top">
          <Link to="/" className="navbar-brand lamsa-brand">
            LAMSA
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <div className="navbar-nav ms-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/explore" className="nav-link">
              Explore
            </Link>

            <Link to="/create" className="nav-link">
              Create
            </Link>

            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
