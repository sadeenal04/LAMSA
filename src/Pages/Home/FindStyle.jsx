import modernImage from "../../assets/modern.png";
import classicImage from "../../assets/classic.png";
import bohemianImage from "../../assets/bohemian.png";
import industrialImage from "../../assets/industrial.png";
import "../../index.css";
import { Link } from "react-router-dom";

function Findstyle() {
  return (
    <div>
      <div className="container text-center py-5">
        <h2 className="mb-4 findstyle-title">Find Your Style</h2>
        <p className="mb-4 findstyle-description">
          Choose a style that feels like you.
        </p>
        <div className="carousel">
          <div className="style-track">
            {/* First set */}

            <div className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={modernImage}
                  alt="Modern"
                  className="card-img-top style-image"
                />

                <div className="card-body">
                  <h5 className="card-title">Modern</h5>

                  <p className="card-text">
                    Clean lines and minimalist design.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={classicImage}
                  alt="Classic"
                  className="card-img-top style-image"
                />

                <div className="card-body">
                  <h5 className="card-title">Classic</h5>

                  <p className="card-text">
                    Timeless elegance and traditional design.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={bohemianImage}
                  alt="Bohemian"
                  className="card-img-top style-image"
                />

                <div className="card-body">
                  <h5 className="card-title">Bohemian</h5>

                  <p className="card-text">
                    Eclectic and free-spirited design.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={industrialImage}
                  alt="Industrial"
                  className="card-img-top style-image"
                />

                <div className="card-body">
                  <h5 className="card-title">Industrial</h5>

                  <p className="card-text">Raw materials and urban design.</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4" aria-hidden="true">
              <div className="card h-100">
                <img
                  src={modernImage}
                  alt=""
                  className="card-img-top style-image"
                />

                <div className="card-body">
                  <h5 className="card-title">Modern</h5>

                  <p className="card-text">
                    Clean lines and minimalist design.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4" aria-hidden="true">
              <div className="card h-100">
                <img
                  src={classicImage}
                  alt=""
                  className="card-img-top style-image"
                />

                <div className="card-body">
                  <h5 className="card-title">Classic</h5>

                  <p className="card-text">
                    Timeless elegance and traditional design.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4" aria-hidden="true">
              <div className="card h-100">
                <img
                  src={bohemianImage}
                  alt=""
                  className="card-img-top style-image"
                />

                <div className="card-body">
                  <h5 className="card-title">Bohemian</h5>

                  <p className="card-text">
                    Eclectic and free-spirited design.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4" aria-hidden="true">
              <div className="card h-100">
                <img
                  src={industrialImage}
                  alt=""
                  className="card-img-top style-image"
                />

                <div className="card-body">
                  <h5 className="card-title">Industrial</h5>

                  <p className="card-text">Raw materials and urban design.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          to="/explore"
          className="d-flex justify-content-center text-decoration-none findstyle-link"
        >
          Explore All Styles →
        </Link>
      </div>
    </div>
  );
}

export default Findstyle;
