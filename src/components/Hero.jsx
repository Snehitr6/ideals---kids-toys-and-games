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

  /* =========================================================
     HERO VIDEO
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const startVideo = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;

        await video.play();

        setVideoReady(true);
        setVideoError(false);
      } catch (error) {
        /*
          Autoplay can be blocked by some browsers.
          The video will still start after the browser
          allows playback or after user interaction.
        */
        console.log(
          "Hero video autoplay waiting:",
          error
        );
      }
    };

    const handleLoadedMetadata = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    };

    const handleCanPlay = () => {
      setVideoReady(true);
      setVideoError(false);

      startVideo();
    };

    const handleLoadedData = () => {
      setVideoReady(true);
      setVideoError(false);

      startVideo();
    };

    const handleError = () => {
      /*
        If kids-playing.mp4 does not exist,
        automatically switch to image fallback.
      */
      setVideoError(true);
      setVideoReady(false);
    };

    video.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

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

    /*
      First autoplay attempt
    */
    startVideo();

    /*
      Retry after browser has loaded the page
    */
    const retryOne = setTimeout(() => {
      startVideo();
    }, 700);

    const retryTwo = setTimeout(() => {
      startVideo();
    }, 1800);

    /*
      Restart video when returning to the tab
    */
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
      clearTimeout(retryOne);
      clearTimeout(retryTwo);

      video.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

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

  /* =========================================================
     KEEP VIDEO PLAYING
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handlePause = () => {
      if (!document.hidden && !videoError) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener(
      "pause",
      handlePause
    );

    return () => {
      video.removeEventListener(
        "pause",
        handlePause
      );
    };
  }, [videoError]);

  /* =========================================================
     SOUND BUTTON
  ========================================================= */

  const toggleSound = async () => {
    const video = videoRef.current;

    if (!video || videoError) return;

    const newMutedState = !video.muted;

    video.muted = newMutedState;
    video.defaultMuted = newMutedState;
    video.volume = newMutedState ? 0 : 1;

    setIsMuted(newMutedState);

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.log(
          "Video playback waiting:",
          error
        );
      }
    }
  };

  /* =========================================================
     SHOP
  ========================================================= */

  const handleShop = () => {
    scrollTo("shop", "All");
  };

  /* =========================================================
     EXPLORE
  ========================================================= */

  const handleExplore = () => {
    scrollTo("categories");
  };

  return (
    <section
      className="hero-section"
      id="home"
    >
      <div className="hero-container">

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="hero-content">

          <span className="hero-eyebrow">
            <Sparkles size={14} />

            PLAYFUL PICKS FOR LITTLE MINDS
          </span>

          <h1>
            Big fun for
            <span>
              little minds.
            </span>
          </h1>

          <p>
            Discover a colorful world of toys designed
            to spark imagination, build confidence and
            create unforgettable childhood memories.
          </p>

          {/* =================================================
              BUTTONS
          ================================================= */}

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

          {/* =================================================
              RATING
          ================================================= */}

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

        {/* ===================================================
            RIGHT VISUAL
        =================================================== */}

        <div className="hero-visual">

          <div className="hero-image-circle">

            <div className="hero-image-wrapper hero-video-wrapper">

              {/* =================================================
                  FALLBACK IMAGE
                  This is shown automatically if the video
                  doesn't exist.
              ================================================= */}

              {videoError && (
                <img
                  className="hero-video-fallback-image"
                  src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=85"
                  alt="Colorful children's toys"
                />
              )}

              {/* =================================================
                  VIDEO
                  If you later add:

                  public/kids-playing.mp4

                  this video will automatically be used.
              ================================================= */}

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
              >
                <source
                  src="/kids-playing.mp4"
                  type="video/mp4"
                />

                Your browser does not support
                HTML5 video.
              </video>

              {/* =================================================
                  OVERLAY
              ================================================= */}

              <div className="hero-video-overlay" />

              {/* =================================================
                  LOADING
              ================================================= */}

              {!videoReady &&
                !videoError && (
                  <div className="hero-video-loading">

                    <div className="hero-video-spinner" />

                    <span>
                      Loading playtime...
                    </span>

                  </div>
                )}

              {/* =================================================
                  VIDEO FALLBACK
              ================================================= */}

              {videoError && (
                <div className="hero-video-fallback">

                  <span>
                    🧸
                  </span>

                  <strong>
                    Let&apos;s Play!
                  </strong>

                  <small>
                    Fun starts here
                  </small>

                </div>
              )}

              {/* =================================================
                  PLAY TIME LABEL
              ================================================= */}

              <div className="hero-video-label">

                <span className="hero-video-dot" />

                PLAY TIME

              </div>

              {/* =================================================
                  SOUND BUTTON
              ================================================= */}

              {!videoError && (
                <button
                  type="button"
                  className="hero-video-sound"
                  onClick={toggleSound}
                  aria-label={
                    isMuted
                      ? "Turn sound on"
                      : "Turn sound off"
                  }
                >
                  {isMuted ? (
                    <VolumeX size={15} />
                  ) : (
                    <Volume2 size={15} />
                  )}
                </button>
              )}

            </div>
          </div>

          {/* ===================================================
              FLOATING BADGE ONE
          =================================================== */}

          <div className="hero-badge hero-badge-one">

            <div className="hero-badge-icon">
              🧸
            </div>

            <div>

              <strong>
                Kids favourite
              </strong>

              <small>
                Play &amp; Learn
              </small>

            </div>

          </div>

          {/* ===================================================
              FLOATING BADGE TWO
          =================================================== */}

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

          {/* ===================================================
              FLOATING BADGE THREE
          =================================================== */}

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

          {/* ===================================================
              FLOATING TOYS
          =================================================== */}

          <span className="hero-floating hero-floating-one">
            🪁
          </span>

          <span className="hero-floating hero-floating-two">
            🧩
          </span>

          <span className="hero-floating hero-floating-three">
            🧸
          </span>

          {/* ===================================================
              DOTS
          =================================================== */}

          <div className="hero-dots">

            <span />
            <span />
            <span />
            <span />

          </div>

        </div>
      </div>

      {/* =====================================================
          FEATURE STRIP
      ===================================================== */}

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

          Fast &amp; easy delivery

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
