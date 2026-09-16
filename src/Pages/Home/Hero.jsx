import heroImage from "../../assets/hero.png";
import "../../index.css";
function Hero() {
  return (
    <div className="container hero">
      <div className="row py-3">
        <div className="col-md-8 d-flex flex-column justify-content-start align-items-start">
          <p className="hero-title mb-5 fw-bold">
            Make your space a reflection of you.
          </p>
          <p className="hero-subtitle mb-5">
            Design, personalize, and make it yours.
          </p>
          <button className="hero-btn">Start Creating</button>
        </div>
        <div className="col-md-4">
          <img src={heroImage} alt="Hero" className="hero-image" />
        </div>
      </div>
    </div>
  );
}
export default Hero;
