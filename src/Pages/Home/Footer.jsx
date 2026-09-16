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
          <a href="#">Contact</a>
        </div>

        <div className="social-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook"></i>
          </a>

          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-twitter-x"></i>
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>

      <Copyright />
    </footer>
  );
}

export default Footer;
