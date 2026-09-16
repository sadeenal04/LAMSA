import "../../index.css";

function HowItWork() {
  return (
    <section className="how-it-works">
      <hr className="about-hr" />
      <div className="container text-center py-5">
        <h2>How It Works</h2>

        <p>From idea to space.</p>

        <div className="how-it-works-content">
          <div>
            <span className="num">01</span>
            <h4>Choose Your Space</h4>
            <p>Pick your room.</p>
          </div>

          <div>
            <span className="num">02</span>
            <h4>Find Your Style</h4>
            <p>Choose your style.</p>
          </div>

          <div>
            <span className="num">03</span>
            <h4>Create Your Space</h4>
            <p>Start designing.</p>
          </div>

          <div>
            <span className="num">04</span>
            <h4>Make It Yours</h4>
            <p>Add your touch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
