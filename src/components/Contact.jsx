import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Sparkles,
} from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submittedName, setSubmittedName] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState("");

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const submit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setError(
        "Please fill in all the fields."
      );
      setSubmitted(false);
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      setSubmitted(false);
      return;
    }

    setSubmittedName(form.name);
    setError("");
    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      className="contact-section"
      id="contact"
    >
      <div className="contact-container">
        <div className="contact-grid">
          <div
            className="contact-info"
            id="about"
          >
            <span className="section-eyebrow">
              <Sparkles size={13} />
              SAY HELLO
            </span>

            <h2>
              Let's make{" "}
              <span>
                play happen.
              </span>
            </h2>

            <p>
              Have a question about a toy,
              delivery or your order? Our
              friendly team is always happy
              to help.
            </p>

            <div className="contact-details">
              <a
                className="contact-detail"
                href="mailto:hello@ideals.toys"
              >
                <span className="contact-detail-icon">
                  <Mail size={18} />
                </span>

                <div>
                  <strong>
                    EMAIL US
                  </strong>

                  <span>
                    hello@ideals.toys
                  </span>
                </div>
              </a>

              <a
                className="contact-detail"
                href="tel:+919876543210"
              >
                <span className="contact-detail-icon">
                  <Phone size={18} />
                </span>

                <div>
                  <strong>
                    CALL US
                  </strong>

                  <span>
                    +91 98765 43210
                  </span>
                </div>
              </a>

              <div className="contact-detail">
                <span className="contact-detail-icon">
                  <MapPin size={18} />
                </span>

                <div>
                  <strong>
                    VISIT US
                  </strong>

                  <span>
                    Bengaluru, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {!submitted ? (
              <form
                className="contact-form"
                onSubmit={submit}
              >
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>
                      Your Name
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={update}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="contact-field">
                    <label>
                      Email Address
                    </label>

                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label>
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={update}
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {error && (
                  <div className="newsletter-error">
                    {error}
                  </div>
                )}

                <button
                  className="contact-submit"
                  type="submit"
                >
                  Send Message
                  <Send size={15} />
                </button>

                <div className="newsletter-note">
                  🔒 Your information is safe
                  with us.
                </div>
              </form>
            ) : (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <Check size={17} />
                </div>

                <div>
                  <strong>
                    Message received!
                  </strong>

                  <p>
                    Thanks,{" "}
                    {submittedName ||
                      "there"}
                    ! Our team will get back
                    to you shortly.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setSubmitted(false)
                    }
                    style={{
                      marginTop: "12px",
                      background:
                        "var(--dark)",
                      color: "#fff",
                      border: "0",
                      borderRadius:
                        "999px",
                      padding:
                        "9px 15px",
                      cursor: "pointer",
                    }}
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;