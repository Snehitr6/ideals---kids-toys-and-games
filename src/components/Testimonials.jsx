import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Star,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Happy Parent",
    avatar: "👩🏻",
    rating: 5,
    text: "The quality of the toys is amazing! My daughter absolutely loved the educational puzzle set. Everything arrived beautifully packed and on time.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Happy Parent",
    avatar: "👨🏻",
    rating: 5,
    text: "IDEALS has become our go-to place for toys. The collection is fun, colorful and feels very safe for kids. Highly recommended!",
  },
  {
    id: 3,
    name: "Priya Kapoor",
    role: "Happy Parent",
    avatar: "👩🏽",
    rating: 5,
    text: "I ordered a building blocks set for my son and he absolutely loved it. Great quality, fast delivery and excellent packaging.",
  },
  {
    id: 4,
    name: "Vikram Rao",
    role: "Happy Parent",
    avatar: "👨🏽",
    rating: 5,
    text: "The variety of toys available is fantastic. I especially liked how easy it was to find age-appropriate and educational toys.",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  const nextTestimonial = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setActive(
      (current) =>
        (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[active];

  return (
    <section
      className="testimonials-section"
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="testimonials-container">

        {/* Section Heading */}
        <div className="section-heading testimonials-heading">
          <span className="section-eyebrow">
            <Star size={15} />
            HAPPY FAMILIES
          </span>

          <h2>
            Loved by Kids,
            <span> Trusted by Parents.</span>
          </h2>

          <p>
            See what families have to say about their IDEALS
            shopping experience.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-layout">

          {/* Decorative Side */}
          <div className="testimonial-decoration">
            <div className="quote-circle">
              <Quote size={42} />
            </div>

            <div className="floating-star star-one">★</div>
            <div className="floating-star star-two">✦</div>
            <div className="floating-star star-three">✧</div>

            <div className="testimonial-stat">
              <strong>4.9/5</strong>
              <div className="stat-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span>From happy families</span>
            </div>
          </div>

          {/* Main Review */}
          <div className="testimonial-card">

            <div className="testimonial-top">
              <div className="testimonial-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={19}
                    fill="currentColor"
                  />
                ))}
              </div>

              <span className="verified-review">
                ✓ Verified Review
              </span>
            </div>

            <blockquote key={current.id}>
              “{current.text}”
            </blockquote>

            <div className="testimonial-person">

              <div className="testimonial-avatar">
                {current.avatar}
              </div>

              <div className="person-info">
                <strong>{current.name}</strong>
                <span>{current.role}</span>
              </div>

              <div className="testimonial-controls">
                <button
                  type="button"
                  onClick={previousTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="testimonial-dots">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === active ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Trust Row */}
        <div className="testimonial-trust">

          <div className="trust-item">
            <span>🛡️</span>
            <div>
              <strong>Safe Shopping</strong>
              <small>Child-friendly products</small>
            </div>
          </div>

          <div className="trust-item">
            <span>⭐</span>
            <div>
              <strong>4.9/5 Rating</strong>
              <small>Loved by families</small>
            </div>
          </div>

          <div className="trust-item">
            <span>🎁</span>
            <div>
              <strong>Gift Ready</strong>
              <small>Beautiful packaging</small>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;