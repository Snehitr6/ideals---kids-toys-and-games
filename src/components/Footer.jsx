import {
  ArrowUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import { useStore } from "../StoreContext.jsx";

function Footer() {
  const { scrollTo } = useStore();

  const top = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <button
              className="brand"
              onClick={() =>
                scrollTo("home")
              }
            >
              <span className="brand-mark">
                <Sparkles size={18} />
              </span>

              <span className="brand-text">
                IDEALS
                <small>
                  KIDS TOYS & GAMES
                </small>
              </span>
            </button>

            <p>
              Creating little moments of
              joy with toys that inspire
              curiosity, creativity and
              imagination.
            </p>

            <div className="social-links">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">
              Explore
            </h4>

            <div className="footer-links">
              <button
                onClick={() =>
                  scrollTo("home")
                }
              >
                Home
              </button>

              <button
                onClick={() =>
                  scrollTo("shop", "All")
                }
              >
                Shop
              </button>

              <button
                onClick={() =>
                  scrollTo("categories")
                }
              >
                Categories
              </button>

              <button
                onClick={() =>
                  scrollTo("about")
                }
              >
                About Us
              </button>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">
              Categories
            </h4>

            <div className="footer-links">
              <button
                onClick={() =>
                  scrollTo(
                    "shop",
                    "Educational Toys"
                  )
                }
              >
                Educational Toys
              </button>

              <button
                onClick={() =>
                  scrollTo(
                    "shop",
                    "Soft Toys"
                  )
                }
              >
                Soft Toys
              </button>

              <button
                onClick={() =>
                  scrollTo(
                    "shop",
                    "Building Blocks"
                  )
                }
              >
                Building Blocks
              </button>

              <button
                onClick={() =>
                  scrollTo(
                    "shop",
                    "Outdoor Games"
                  )
                }
              >
                Outdoor Games
              </button>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">
              Let's play!
            </h4>

            <p className="footer-cta-text">
              Need help choosing the
              perfect toy? Talk to our
              friendly team.
            </p>

            <button
              className="footer-contact-button"
              onClick={() =>
                scrollTo("contact")
              }
            >
              Contact us
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 IDEALS. Made with ♥ for
            little dreamers.
          </span>

          <span>
            VISA · UPI · MASTERCARD
          </span>

          <button
            className="back-top"
            onClick={top}
            aria-label="Back to top"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;