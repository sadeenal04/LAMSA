import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import modern1 from "../../assets/modern1.png";
import modern2 from "../../assets/modern2.png";
import modern3 from "../../assets/modern3.png";
import modern4 from "../../assets/modern4.png";
import modern5 from "../../assets/modern5.png";
import modern6 from "../../assets/modern6.png";
import classic1 from "../../assets/classic1.png";
import classic2 from "../../assets/classic2.png";
import classic3 from "../../assets/classic3.png";
import classic4 from "../../assets/classic4.png";
import classic5 from "../../assets/classic5.png";
import classic6 from "../../assets/classic6.png";
import bohemian1 from "../../assets/bohemian1.png";
import bohemian2 from "../../assets/bohemian2.png";
import bohemian3 from "../../assets/bohemian3.png";
import bohemian4 from "../../assets/bohemian4.png";
import bohemian5 from "../../assets/bohemian5.png";
import bohemian6 from "../../assets/bohemian6.png";
import industrial1 from "../../assets/industrial1.png";
import industrial2 from "../../assets/industrial2.png";
import industrial3 from "../../assets/industrial3.png";
import industrial4 from "../../assets/industrial4.png";
import industrial5 from "../../assets/industrial5.png";
import industrial6 from "../../assets/industrial6.png";
function Styles() {
  const [style, setstyle] = useState("Modern");
  const navigate = useNavigate();
  const design = {
    Modern: [modern1, modern3, modern5, modern4, modern6, modern2],

    Classic: [classic1, classic2, classic3, classic4, classic5, classic6],

    Bohemian: [
      bohemian1,
      bohemian2,
      bohemian3,
      bohemian5,
      bohemian4,
      bohemian6,
    ],

    Industrial: [
      industrial1,
      industrial2,
      industrial3,
      industrial4,
      industrial5,
      industrial6,
    ],
  };
  const selecteddesign = design[style];
  return (
    <section className="styles-section py-5">
      <div className="container text-center">
        <h2 className="styles-title mb-1">Discover Your Style</h2>

        <p className="styles-description mb-4">
          Choose a style and explore inspiring designs.
        </p>

        <div>
          <button
            className={`style-filter ${style === "Modern" ? "active" : ""}`}
            onClick={() => setstyle("Modern")}
          >
            Modern
          </button>

          <button
            className={`style-filter ${style === "Classic" ? "active" : ""}`}
            onClick={() => setstyle("Classic")}
          >
            Classic
          </button>

          <button
            className={`style-filter ${style === "Bohemian" ? "active" : ""}`}
            onClick={() => setstyle("Bohemian")}
          >
            Bohemian
          </button>

          <button
            className={`style-filter ${style === "Industrial" ? "active" : ""}`}
            onClick={() => setstyle("Industrial")}
          >
            Industrial
          </button>
        </div>
        <div className="row g-4 mt-4">
          {selecteddesign.map((item) => (
            <div className="col-md-6 col-lg-4" key={item}>
              <div className="design-card">
                <img src={item} alt={style} />
              </div>
            </div>
          ))}
        </div>

        <div className="explore-cta text-center mt-5">
          <h2>Create Your Own Space</h2>

          <p>Create a design as you imagine it in your mind.</p>

          <button
            className="explore-cta-btn"
            onClick={() => navigate("/create")}
          >
            Start Creating
          </button>
        </div>
      </div>
    </section>
  );
}

export default Styles;
