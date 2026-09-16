import {
  ArrowRight,
  Sparkles,
  Star,
  Volume2,
  Truck,
  Heart,
  Palette,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useStore } from "../StoreContext.jsx";

function Hero() {
  const { scrollTo } = useStore();

  const videoRef = useRef(null);

  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const startVideo = async () => {
      try {
        video.muted = true;
        video.volume = 0;

        await video.play();

        setVideoReady(true);
        setVideoError(false);
      } catch (error) {
        console.log(
          "Hero video could not autoplay:",
          error
        );
      }
    };

    const handleCanPlay = () => {
      setVideoReady(true);
      setVideoError(false);
      startVideo();
    };

    const handleLoadedData = () => {
      setVideoReady(true);
      startVideo();
    };

    const handleError = () => {
      setVideoError(true);
      setVideoReady(false);
    };

    video.addEventListener(
      "canplay",
      handleCanPlay
    );

    video.addEventListener(
      "loadeddata",
      handleLoadedData
    );

    video.addEventListener(
      "error",
      handleError
    );

    startVideo();

    const handleVisibility = () => {
      if (!document.hidden) {
        startVideo();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      video.removeEventListener(
        "canplay",
        handleCanPlay
      );

      video.removeEventListener(
        "loadeddata",
        handleLoadedData
      );

      video.removeEventListener(
        "error",
        handleError
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  const handleShop = () => {
    scrollTo("shop", "All");
  };

  const handleExplore = () => {
    scrollTo("categories");
  };

  return (
    <section
      className="hero-section"
      id="home"
    >
      <div className="hero-container">

        {/* =========================
            LEFT CONTENT
        ========================= */}

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

          <div className="hero-rating">

            <div className="hero-avatars">
              <span>👧</span>
              <span>👦</span>
              <span>🧒</span>
            </div>

            <div className="hero-rating-info">

              <div className="hero-stars">
                {[1, 2, 3, 4, 5].map(
                  (item) => (
                    <Star
                      key={item}
                      size={14}
                      fill="currentColor"
                    />
                  )
                )}
              </div>

              <span>
                <strong>4.9/5</strong>{" "}
                loved by 2,000+ parents
              </span>

            </div>

          </div>
        </div>

        {/* =========================
            RIGHT VIDEO
        ========================= */}

        <div className="hero-visual">

          <div className="hero-image-circle">

            <div className="hero-image-wrapper hero-video-wrapper">

              {/* VIDEO */}

              <video
                ref={videoRef}
                className={`hero-video ${
                  videoReady
                    ? "video-ready"
                    : ""
                }`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                aria-label="Kids playing with toys"
                poster="/images/kids-playing-poster.jpg"
              >
                <source
                  src="/kids-playing.mp4"
                  type="video/mp4"
                />

                Your browser does not support
                HTML5 video.
              </video>

              {/* VIDEO OVERLAY */}

              <div className="hero-video-overlay" />

              {/* VIDEO LOADING STATE */}

              {!videoReady &&
                !videoError && (
                  <div className="hero-video-loading">
                    <div className="hero-video-spinner" />

                    <span>
                      Loading playtime...
                    </span>
                  </div>
                )}

              {/* VIDEO ERROR */}

              {videoError && (
                <div className="hero-video-fallback">
                  <span>🧸</span>

                  <strong>
                    Let’s Play!
                  </strong>

                  <small>
                    Add kids-playing.mp4
                    to public/videos
                  </small>
                </div>
              )}

              {/* PLAY TIME LABEL */}

              <div className="hero-video-label">
                <span className="hero-video-dot" />
                PLAY TIME
              </div>

              {/* SOUND INDICATOR */}

              <div className="hero-video-sound">
                <Volume2 size={15} />
              </div>

            </div>
          </div>

          {/* =========================
              FLOATING BADGES
          ========================= */}

          <div className="hero-badge hero-badge-one">

            <div className="hero-badge-icon">
              🧸
            </div>

            <div>
              <strong>
                Kids favourite
              </strong>

              <small>
                Play & Learn
              </small>
            </div>

          </div>

          <div className="hero-badge hero-badge-two">

            <div className="hero-badge-icon">
              <Palette size={17} />
            </div>

            <div>
              <strong>
                Creative Play
              </strong>

              <small>
                Made for imagination
              </small>
            </div>

          </div>

          <div className="hero-badge hero-badge-three">

            <div className="hero-badge-icon">
              <Truck size={17} />
            </div>

            <div>
              <strong>
                Fast Delivery
              </strong>

              <small>
                Happy playtime sooner
              </small>
            </div>

          </div>

          {/* =========================
              FLOATING TOYS
          ========================= */}

          <span className="hero-floating hero-floating-one">
            🪁
          </span>

          <span className="hero-floating hero-floating-two">
            🧩
          </span>

          <span className="hero-floating hero-floating-three">
            🧸
          </span>

          <div className="hero-dots">
            <span />
            <span />
            <span />
            <span />
          </div>

        </div>
      </div>

      {/* =========================
          FEATURE STRIP
      ========================= */}

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