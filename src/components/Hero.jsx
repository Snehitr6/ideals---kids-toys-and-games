import {
  ArrowRight,
  Sparkles,
  Star,
  Truck,
  Heart,
  Palette,
} from "lucide-react";

import { useStore } from "../StoreContext.jsx";

function Hero() {
  const { scrollTo } = useStore();

  const handleShop = () => {
    scrollTo("shop", "All");
  };

  const handleExplore = () => {
    scrollTo("categories");
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">

        {/* ================= HERO CONTENT ================= */}

        <div className="hero-content">

          <span className="hero-eyebrow">
            <Sparkles size={14} />
            PLAYFUL PICKS FOR LITTLE MINDS
          </span>

          <h1>
            Big fun for
            <span>little minds.</span>
          </h1>

          <p>
            Discover a colorful world of toys designed
            to spark imagination, build confidence and
            create unforgettable childhood memories.
          </p>

          <div className="hero-buttons">

            <button
              type="button"
              className="hero-primary"
              onClick={handleShop}
            >
              Shop Now
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="hero-secondary"
              onClick={handleExplore}
            >
              Explore Toys
            </button>

          </div>

          {/* Rating */}

          <div className="hero-rating">

            <div className="hero-avatars">
              <span>👧</span>
              <span>👦</span>
              <span>🧒</span>
            </div>

            <div className="hero-rating-info">

              <div className="hero-stars">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    size={14}
                    fill="currentColor"
                  />
                ))}
              </div>

              <span>
                <strong>4.9/5</strong>{" "}
                loved by 2,000+ parents
              </span>

            </div>

          </div>

        </div>

        {/* ================= HERO IMAGE ================= */}

        <div className="hero-visual">

          <div className="hero-image-circle">

            <div className="hero-image-wrapper">

              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=90"
                alt="Colorful toys for children"
              />

              <div className="hero-image-overlay" />

              <div className="hero-image-label">
                <span className="hero-image-dot" />
                PLAY TIME
              </div>

            </div>

          </div>

          {/* ================= BADGE ONE ================= */}

          <div className="hero-badge hero-badge-one">

            <div className="hero-badge-icon">
              🧸
            </div>

            <div>
              <strong>Kids favourite</strong>
              <small>Play & Learn</small>
            </div>

          </div>

          {/* ================= BADGE TWO ================= */}

          <div className="hero-badge hero-badge-two">

            <div className="hero-badge-icon">
              <Palette size={17} />
            </div>

            <div>
              <strong>Creative Play</strong>
              <small>Made for imagination</small>
            </div>

          </div>

          {/* ================= BADGE THREE ================= */}

          <div className="hero-badge hero-badge-three">

            <div className="hero-badge-icon">
              <Truck size={17} />
            </div>

            <div>
              <strong>Fast Delivery</strong>
              <small>Happy playtime sooner</small>
            </div>

          </div>

          {/* ================= FLOATING TOYS ================= */}

          <span className="hero-floating hero-floating-one">
            🪁
          </span>

          <span className="hero-floating hero-floating-two">
            🧩
          </span>

          <span className="hero-floating hero-floating-three">
            🧸
          </span>

          {/* ================= DOTS ================= */}

          <div className="hero-dots">
            <span />
            <span />
            <span />
            <span />
          </div>

        </div>

      </div>

      {/* ================= FEATURES ================= */}

      <div className="hero-features">

        <div className="hero-feature">
          <Heart size={15} />
          Safe for little ones
        </div>

        <div className="hero-feature">
          <Sparkles size={15} />
          Curated with care
        </div>

        <div className="hero-feature">
          <Truck size={15} />
          Fast & easy delivery
        </div>

        <div className="hero-feature">
          <Star size={15} />
          Loved by parents
        </div>

      </div>

    </section>
  );
}

export default Hero;
