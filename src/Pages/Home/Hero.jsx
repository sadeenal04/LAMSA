import heroImage from "../../assets/hero.png";
import "../../index.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container hero">
      <div className="row align-items-center py-3">
        <div className="col-8 col-md-8 hero-content">
          <p className="hero-title mb-5 fw-bold">
            Make your space a reflection of you.
          </p>

          <p className="hero-subtitle mb-5 d-none d-md-block">
            Design, personalize, and make it yours.
          </p>

          <button className="hero-btn" onClick={() => navigate("/create")}>
            Start Creating
          </button>
        </div>

        <div className="col-4 col-md-4 hero-image-container">
          <img src={heroImage} alt="Hero" className="hero-image" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
