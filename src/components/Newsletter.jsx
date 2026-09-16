import { useState } from "react";

import {
  Mail,
  Send,
  Check,
  Sparkles,
} from "lucide-react";

function Newsletter() {
  const [email, setEmail] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState("");

  const submit = (e) => {
    e.preventDefault();

    const value = email.trim();

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        value
      )
    ) {
      setError(
        "Please enter a valid email address."
      );

      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      className="newsletter-section"
      id="newsletter"
    >
      <div className="newsletter-container">
        <span className="newsletter-decoration newsletter-decoration-one">
          ✦
        </span>

        <span className="newsletter-decoration newsletter-decoration-two">
          ✦
        </span>

        <div className="newsletter-content">
          <div className="newsletter-icon">
            <Mail size={25} />
          </div>

          <span className="newsletter-eyebrow">
            THE IDEALS PLAYLIST
          </span>

          <h2>
            Little joys,{" "}
            <span>in your inbox.</span>
          </h2>

          <p>
            Get new toy drops, playful ideas
            and family-friendly offers. No
            clutter, just the good stuff.
          </p>

          {!submitted ? (
            <form
              className="newsletter-form"
              onSubmit={submit}
            >
              <div className="newsletter-input-wrapper">
                <Mail size={17} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Your email address"
                />
              </div>

              <button
                className="newsletter-button"
                type="submit"
              >
                Join us
                <Send size={15} />
              </button>
            </form>
          ) : (
            <div className="newsletter-success">
              <div className="newsletter-success-icon">
                <Check size={18} />
              </div>

              <div>
                <strong>
                  You're on the list!
                </strong>

                <p>
                  Watch your inbox for
                  playful IDEALS updates.
                </p>
              </div>
            </div>
          )}

          {error && (
            <p className="newsletter-error">
              {error}
            </p>
          )}

          <div className="newsletter-note">
            <Sparkles size={12} />
            Unsubscribe anytime. We respect
            your inbox.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;