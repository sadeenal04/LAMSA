import "../../index.css";
import Copyright from "../../components/Copyright";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="title text-center">
        <h3>LAMSA</h3>

        <p>Your space. Your style. Your touch.</p>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="social-icons">
          <span>
            <i className="bi bi-facebook"></i>
          </span>

          <span>
            <i className="bi bi-twitter-x"></i>
          </span>

          <span>
            <i className="bi bi-instagram"></i>
          </span>
        </div>
      </div>

      <Copyright />
    </footer>
  );
}

export default Footer;
