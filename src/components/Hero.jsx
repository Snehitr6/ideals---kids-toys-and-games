import {
  ArrowRight,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
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
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const playVideo = async () => {
      try {
        video.muted = true;
        video.volume = 0;

        await video.play();

        setVideoReady(true);
        setVideoError(false);
      } catch (error) {
        console.log("Video autoplay waiting:", error);
      }
    };

    const handleLoadedData = () => {
      setVideoReady(true);
      setVideoError(false);
      playVideo();
    };

    const handleCanPlay = () => {
      setVideoReady(true);
      setVideoError(false);
      playVideo();
    };

    const handlePlaying = () => {
      setVideoReady(true);
      setVideoError(false);
    };

    const handleError = () => {
      console.error("Hero video failed to load:", video.error);

      setVideoReady(false);
      setVideoError(true);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);

    playVideo();

    const handleVisibility = () => {
      if (!document.hidden) {
        playVideo();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      video.removeEventListener(
        "loadeddata",
        handleLoadedData
      );

      video.removeEventListener(
        "canplay",
        handleCanPlay
      );

      video.removeEventListener(
        "playing",
        handlePlaying
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

  const toggleSound = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.muted) {
        video.muted = false;
        video.volume = 1;

        setIsMuted(false);

        await video.play();
      } else {
        video.muted = true;
        video.volume = 0;

        setIsMuted(true);
      }
    } catch (error) {
      console.log("Sound toggle failed:", error);
    }
  };

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

        {/* ================= HERO VIDEO ================= */}

        <div className="hero-visual">

          <div className="hero-image-circle">

            <div className="hero-image-wrapper hero-video-wrapper">

              <video
                ref={videoRef}
                className={`hero-video ${
                  videoReady ? "video-ready" : ""
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
              >
                <source
                  src="/kids-playing.mp4"
                  type="video/mp4"
                />

                Your browser does not support HTML5 video.
              </video>

              <div className="hero-video-overlay" />

              {!videoReady && !videoError && (
                <div className="hero-video-loading">
                  <div className="hero-video-spinner" />

                  <span>
                    Loading playtime...
                  </span>
                </div>
              )}

              {videoError && (
                <div className="hero-video-fallback">
                  <span>🧸</span>

                  <strong>
                    Video unavailable
                  </strong>

                  <small>
                    Check public/kids-playing.mp4
                  </small>
                </div>
              )}

              <div className="hero-video-label">
                <span className="hero-video-dot" />
                PLAY TIME
              </div>

              <button
                type="button"
                className="hero-video-sound"
                onClick={toggleSound}
                aria-label={
                  isMuted
                    ? "Turn video sound on"
                    : "Mute video"
                }
              >
                {isMuted ? (
                  <VolumeX size={15} />
                ) : (
                  <Volume2 size={15} />
                )}
              </button>

            </div>

          </div>

          {/* ================= BADGES ================= */}

          <div className="hero-badge hero-badge-one">

            <div className="hero-badge-icon">
              🧸
            </div>

            <div>
              <strong>Kids favourite</strong>
              <small>Play & Learn</small>
            </div>

          </div>

          <div className="hero-badge hero-badge-two">

            <div className="hero-badge-icon">
              <Palette size={17} />
            </div>

            <div>
              <strong>Creative Play</strong>
              <small>Made for imagination</small>
            </div>

          </div>

          <div className="hero-badge hero-badge-three">

            <div className="hero-badge-icon">
              <Truck size={17} />
            </div>

            <div>
              <strong>Fast Delivery</strong>
              <small>Happy playtime sooner</small>
            </div>

          </div>

          {/* ================= FLOATING ELEMENTS ================= */}

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
