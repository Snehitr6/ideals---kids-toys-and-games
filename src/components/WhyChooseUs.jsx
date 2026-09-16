import {
  ShieldCheck,
  Award,
  Truck,
  Brain,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useStore } from "../StoreContext.jsx";

const reasons = [
  {
    number: "01",
    title: "Safe & Child-Friendly",
    text: "Thoughtfully selected products designed with little ones in mind.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Quality First",
    text: "We focus on durable toys made for repeated play and discovery.",
    icon: Award,
  },
  {
    number: "03",
    title: "Fast Delivery",
    text: "Quick and reliable delivery so playtime doesn't have to wait.",
    icon: Truck,
  },
  {
    number: "04",
    title: "Educational Value",
    text: "Playful products that encourage creativity, curiosity and learning.",
    icon: Brain,
  },
  {
    number: "05",
    title: "Parent Approved",
    text: "Simple choices for parents looking for fun and meaningful play.",
    icon: Heart,
  },
  {
    number: "06",
    title: "Made for Joy",
    text: "Every product is selected to create happy little moments.",
    icon: Sparkles,
  },
];

function WhyChooseUs() {
  const { scrollTo } = useStore();

  return (
    <section
      className="why-section"
      id="about"
    >
      <div className="why-container">
        <div className="why-header">
          <div className="why-heading">
            <span className="section-eyebrow">
              <Sparkles size={13} />
              WHY IDEALS
            </span>

            <h2>
              More than toys.
              <span> More possibilities.</span>
            </h2>
          </div>

          <div className="why-intro">
            <p>
              We believe the best toys do
              more than entertain. They
              encourage children to explore,
              create, learn and imagine.
            </p>

            <button
              onClick={() =>
                scrollTo("shop", "All")
              }
            >
              Explore our toys
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="why-grid">
          {reasons.map(
            ({
              number,
              title,
              text,
              icon: Icon,
            }) => (
              <article
                className="why-card"
                key={number}
              >
                <div className="why-card-top">
                  <div className="why-icon">
                    <Icon size={23} />
                  </div>

                  <span className="why-number">
                    {number}
                  </span>
                </div>

                <div className="why-card-content">
                  <h3>{title}</h3>

                  <p>{text}</p>

                  <div className="why-card-line" />
                </div>
              </article>
            )
          )}
        </div>

        <div className="why-highlight">
          <div className="why-highlight-icon">
            <Heart size={25} />
          </div>

          <div className="why-highlight-text">
            <span>THE IDEALS PROMISE</span>

            <h3>
              Happy kids. Happy parents.
            </h3>
          </div>

          <div className="why-highlight-badge">
            <strong>4.9</strong>
            <span>
              Parent rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;