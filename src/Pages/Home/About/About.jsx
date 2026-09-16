import Card from "./Card";
import "../../../index.css";
function About() {
  return (
    <section className="about-section py-4">
      <div>
        <hr className="about-hr" />
        <p className="about-title text-center mb-5 ">About LAMSA</p>
        <p className="about-heading text-center">
          Your space. Your style. Your touch.
        </p>

        <p className="about-description text-center">
          LAMSA is a space where your ideas become a design. Explore
          inspiration, discover your style, and create a space that truly feels
          like yours.
        </p>
      </div>
      <div className="container">
        <div className="row justify-content-center g-5 ">
          <div className="col-md-3">
            <Card
              title="Explore"
              description="Discover inspiration & styles."
              icon="bi bi-palette"
            />
          </div>

          <div className="col-md-3">
            <Card
              title="Create"
              description="Build your own space."
              icon="bi bi-pencil-square"
            />
          </div>

          <div className="col-md-3">
            <Card
              title="Personalize"
              description="Make it uniquely yours."
              icon="bi bi-sliders"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
