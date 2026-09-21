import { useState } from "react";
import "../../index.css";
import Navbar from "../Home/Navbar";
import Copyright from "../../components/Copyright";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <Navbar style={{ backgroundColor: "var(--secondary)" }} />

      <section className="contact-section py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-md-5">
              <div className="contact-info">
                <p className="contact-small-title">LET'S CONNECT</p>

                <h1 className="contact-title">Get in Touch</h1>

                <p className="contact-description">
                  Have a question, an idea, or simply want to say hello? We'd
                  love to hear from you.
                </p>

                <div className="contact-details mt-5">
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <i className="bi bi-envelope contact-icon"></i>

                    <div>
                      <h6>Email</h6>
                      <p>lamsa@gmail.com</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <i className="bi bi-geo-alt contact-icon"></i>

                    <div>
                      <h6>Location</h6>
                      <p>Amman, Jordan</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-chat-heart contact-icon"></i>

                    <div>
                      <h6>Let's talk</h6>
                      <p>Have an idea? Tell us about it.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="contact-form-wrapper p-4 p-md-5">
                <h2 className="contact-form-title mb-4">Send us a message</h2>

                {submitted && (
                  <div className="alert contact-alert" role="alert">
                    Thank you! Your message has been received.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control contact-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control contact-input"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      className="form-control contact-input"
                      placeholder="Write your message..."
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn contact-submit-btn">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Copyright style={{ backgroundColor: "var(--secondary)" }} />
    </div>
  );
}

export default Contact;
