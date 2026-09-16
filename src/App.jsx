import { useEffect, useState } from "react";
import "./App.css";

import {
  StoreProvider,
  useStore,
} from "./StoreContext.jsx";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Categories from "./components/Categories.jsx";
import FeaturedProducts from "./components/FeaturedProducts.jsx";
import Offers from "./components/Offers.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ProductModal from "./components/ProductModal.jsx";

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 3000;

    const animate = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);

      // Smooth loading curve: quick start, slower finish.
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setLeaving(true);

        window.setTimeout(() => {
          onComplete();
        }, 650);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [onComplete]);

  return (
    <div
      className={`ideals-loader ${leaving ? "ideals-loader-leaving" : ""}`}
      aria-label="Loading IDEALS"
    >
      <div className="loader-noise" />

      <div className="loader-orbit loader-orbit-one" />
      <div className="loader-orbit loader-orbit-two" />

      <div className="loader-scene">
        <div className="loader-top-spark spark-one">✦</div>
        <div className="loader-top-spark spark-two">✦</div>
        <div className="loader-top-spark spark-three">✦</div>

        <div className="loader-block loader-block-one">
          <span />
        </div>

        <div className="loader-block loader-block-two">
          <span />
        </div>

        <div className="loader-block loader-block-three">
          <span />
        </div>

        <div className="loader-teddy">
          <div className="teddy-ear teddy-ear-left" />
          <div className="teddy-ear teddy-ear-right" />
          <div className="teddy-head">
            <span className="teddy-eye teddy-eye-left" />
            <span className="teddy-eye teddy-eye-right" />
            <span className="teddy-nose" />
            <span className="teddy-mouth" />
          </div>
          <div className="teddy-body" />
        </div>

        <div className="loader-car-track">
          <span className="track-line track-line-one" />
          <span className="track-line track-line-two" />
          <span className="track-line track-line-three" />
        </div>

        <div className="loader-car">
          <span className="car-window" />
          <span className="car-wheel car-wheel-left" />
          <span className="car-wheel car-wheel-right" />
          <span className="car-light" />
        </div>

        <div className="loader-ball">
          <span />
        </div>

        <div className="loader-brand">
          <div className="loader-brand-mark">🧸</div>

          <div className="loader-brand-name">
            IDEALS
            <small>TOYS & GAMES</small>
          </div>
        </div>

        <div className="loader-copy">
          <span className="loader-kicker">
            A LITTLE WORLD OF BIG IMAGINATION
          </span>

          <h1>
            Let the
            <span>play begin.</span>
          </h1>

          <p>
            Preparing a playful world of toys,
            games and happy little discoveries.
          </p>
        </div>
      </div>

      <div className="loader-bottom">
        <div className="loader-progress">
          <div
            className="loader-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loader-progress-meta">
          <span>BUILDING YOUR PLAYROOM</span>
          <strong>{String(progress).padStart(2, "0")}%</strong>
        </div>
      </div>

      <div className="loader-corner loader-corner-left">
        SAFE • PLAYFUL • CURIOUS
      </div>

      <div className="loader-corner loader-corner-right">
        EST. FOR LITTLE DREAMERS
      </div>
    </div>
  );
}

function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className={`store-toast ${toast.type}`}>
      <span>✓</span>
      {toast.message}
    </div>
  );
}

function OrderSuccess() {
  const {
    orderSuccess,
    closeOrderSuccess,
    scrollTo,
  } = useStore();

  if (!orderSuccess) return null;

  return (
    <div
      className="side-panel-layer"
      onClick={closeOrderSuccess}
    >
      <div
        className="side-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="side-panel-head">
          <div>
            <span>ORDER CONFIRMED</span>
            <h3>Thank you!</h3>
          </div>

          <button onClick={closeOrderSuccess}>
            ×
          </button>
        </div>

        <div className="account-box">
          <div className="account-avatar">
            ✓
          </div>

          <h3>Order placed successfully</h3>

          <p>Your IDEALS order has been confirmed.</p>

          <p>
            <strong>Order ID: {orderSuccess}</strong>
          </p>

          <button
            onClick={() => {
              closeOrderSuccess();
              scrollTo("shop", "All");
            }}
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Offers />
        <WhyChooseUs />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>

      <Footer />
      <ProductModal />
      <OrderSuccess />
      <Toast />
    </>
  );
}

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    document.body.classList.add("ideals-loading");

    return () => {
      document.body.classList.remove("ideals-loading");
    };
  }, []);

  const finishLoading = () => {
    document.body.classList.remove("ideals-loading");
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && (
        <LoadingScreen onComplete={finishLoading} />
      )}

      <div
        className={`ideals-app ${
          showLoader ? "ideals-app-hidden" : "ideals-app-visible"
        }`}
      >
        <StoreProvider>
          <AppContent />
        </StoreProvider>
      </div>
    </>
  );
}

export default App;
