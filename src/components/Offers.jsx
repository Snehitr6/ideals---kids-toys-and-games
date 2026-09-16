import { useEffect, useState } from "react";

import {
  Gift,
  ArrowRight,
  Clock3,
  Tag,
  Truck,
  Sparkles,
  Percent,
} from "lucide-react";

import { useStore } from "../StoreContext.jsx";

function getTimeLeft() {
  const now = Date.now();

  // Demo offer duration: 2 days, 14 hours, 33 minutes, 48 seconds
  // The timer continues normally after the page loads.
  const savedEnd = localStorage.getItem("ideals-offer-end");

  let endTime = savedEnd
    ? Number(savedEnd)
    : now +
      (((2 * 24 + 14) * 60 + 33) * 60 + 48) * 1000;

  if (!savedEnd || Number.isNaN(endTime) || endTime <= now) {
    endTime =
      now +
      (((2 * 24 + 14) * 60 + 33) * 60 + 48) *
        1000;

    localStorage.setItem(
      "ideals-offer-end",
      String(endTime)
    );
  }

  const difference = Math.max(
    0,
    endTime - now
  );

  const totalSeconds = Math.floor(
    difference / 1000
  );

  const days = Math.floor(
    totalSeconds / 86400
  );

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    endTime,
  };
}

function Offers() {
  const { scrollTo } = useStore();

  const [time, setTime] = useState(() =>
    getTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (value) =>
    String(value).padStart(2, "0");

  const handleShopDeal = () => {
    scrollTo("shop", "All");
  };

  return (
    <section
      className="offers-section"
      id="offers"
    >
      <div className="offers-container">

        {/* =========================================
            OFFERS HEADER
        ========================================== */}
        <div className="offers-heading">
          <span className="section-eyebrow">
            <Sparkles size={13} />
            SPECIAL OFFERS
          </span>

          <h2>
            Little treats,
            <br />
            <span>big smiles.</span>
          </h2>

          <p>
            Fun deals picked especially for
            little dreamers and their big
            imaginations.
          </p>
        </div>

        {/* =========================================
            MAIN OFFER
        ========================================== */}
        <div className="main-offer-card">

          {/* Decorative shapes */}
          <span
            className="offer-shape offer-shape-one"
            aria-hidden="true"
          />

          <span
            className="offer-shape offer-shape-two"
            aria-hidden="true"
          />

          {/* =======================================
              LEFT CONTENT
          ======================================== */}
          <div className="offer-left">

            <div className="offer-icon">
              <Gift size={27} />
            </div>

            <span className="offer-label">
              WEEKEND PLAY DEAL
            </span>

            <h3>
              Up to{" "}
              <strong>30% OFF</strong>
            </h3>

            <p>
              Bring home more imagination with
              selected toys and games.
            </p>

            <button
              type="button"
              className="offer-button"
              onClick={handleShopDeal}
            >
              Shop the deal
              <ArrowRight size={17} />
            </button>
          </div>

          {/* =======================================
              CENTER GIFT
          ======================================== */}
          <div className="offer-center">

            <div
              className="offer-gift"
              aria-hidden="true"
            >
              <span
                style={{
                  fontSize: "38px",
                  lineHeight: 1,
                }}
              >
                🎁
              </span>
            </div>

            <div className="offer-tag">
              <Tag size={12} />
              PLAY30
            </div>
          </div>

          {/* =======================================
              RIGHT COUNTDOWN
          ======================================== */}
          <div className="offer-right">

            <div className="countdown-title">
              <Clock3 size={14} />
              OFFER ENDS SOON
            </div>

            <div className="countdown">

              <div className="countdown-box">
                <strong>
                  {formatNumber(time.days)}
                </strong>
                <span>DAYS</span>
              </div>

              <span className="countdown-separator">
                :
              </span>

              <div className="countdown-box">
                <strong>
                  {formatNumber(time.hours)}
                </strong>
                <span>HRS</span>
              </div>

              <span className="countdown-separator">
                :
              </span>

              <div className="countdown-box">
                <strong>
                  {formatNumber(time.minutes)}
                </strong>
                <span>MIN</span>
              </div>

              <span className="countdown-separator">
                :
              </span>

              <div className="countdown-box">
                <strong>
                  {formatNumber(time.seconds)}
                </strong>
                <span>SEC</span>
              </div>

            </div>

            <p className="offer-small-text">
              No code needed · Selected products
            </p>
          </div>
        </div>

        {/* =========================================
            SMALL OFFER CARDS
        ========================================== */}
        <div className="small-offers">

          <article className="small-offer-card">
            <div className="small-offer-icon">
              <Percent size={23} />
            </div>

            <div className="small-offer-content">
              <span>
                SPECIAL PICK
              </span>

              <h4>
                Learning Fun
              </h4>

              <p>
                Save on educational toys.
              </p>
            </div>

            <ArrowRight size={19} />
          </article>

          <article className="small-offer-card">
            <div className="small-offer-icon">
              <Truck size={23} />
            </div>

            <div className="small-offer-content">
              <span>
                DELIVERY
              </span>

              <h4>
                Easy Delivery
              </h4>

              <p>
                Fast shipping on selected picks.
              </p>
            </div>

            <ArrowRight size={19} />
          </article>

          <article className="small-offer-card">
            <div className="small-offer-icon">
              <Gift size={23} />
            </div>

            <div className="small-offer-content">
              <span>
                LITTLE EXTRA
              </span>

              <h4>
                More to Love
              </h4>

              <p>
                Discover playful new favourites.
              </p>
            </div>

            <ArrowRight size={19} />
          </article>

        </div>
      </div>
    </section>
  );
}

export default Offers;