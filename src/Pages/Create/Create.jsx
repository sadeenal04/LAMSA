import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import Navbar from "../Home/Navbar";
import Copyright from "../../components/Copyright";

function Create() {
  const [design, setDesign] = useState({
    space: "",
    style: "",
  });

  const navigate = useNavigate();

  const spaces = [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Office",
    "My Own Space",
  ];

  const styles = ["Modern", "Classic", "Bohemian", "Industrial"];

  const handleStartDesigning = () => {
    if (!design.space || !design.style) {
      return;
    }

    navigate("/create/design", {
      state: design,
    });
  };

  return (
    <div>
      <Navbar style={{ backgroundColor: "var(--background)" }} />

      <section className="create-section">
        <div className="container text-center">
          <h1 className="create-title">Create Your Space</h1>

          <p className="create-description">
            Choose the space and style you want to design.
          </p>

          {/* Space Selection */}
          <div className="row g-4 mt-4">
            {spaces.map((space) => (
              <div className="col-md-4" key={space}>
                <button
                  className={`create-space ${
                    design.space === space ? "active" : ""
                  }`}
                  onClick={() =>
                    setDesign({
                      ...design,
                      space: space,
                    })
                  }
                >
                  {space}
                </button>
              </div>
            ))}
          </div>

          {/* Style Selection */}
          <div className="create-style mt-5">
            <h2 className="create-style-title">Choose Your Style</h2>

            <p className="create-style-description">
              Choose a style that fits your space.
            </p>

            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
              {styles.map((style) => (
                <button
                  className={`create-style-btn ${
                    design.style === style ? "active" : ""
                  }`}
                  key={style}
                  onClick={() =>
                    setDesign({
                      ...design,
                      style: style,
                    })
                  }
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Start Designing */}
          <button
            className="create-design-btn mt-5"
            disabled={!design.space || !design.style}
            onClick={handleStartDesigning}
          >
            Start Designing
          </button>
        </div>
      </section>

      <Copyright style={{ backgroundColor: "var(--background)" }} />
    </div>
  );
}

export default Create;
