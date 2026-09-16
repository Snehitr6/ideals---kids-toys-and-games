import {
  ArrowUpRight,
  Brain,
  Heart,
  Dumbbell,
  Blocks,
  Gamepad2,
  Baby,
  Sparkles,
} from "lucide-react";

import { useStore } from "../StoreContext.jsx";

const categories = [
  {
    number: "01",
    name: "Educational Toys",
    count: "120+ Toys",
    icon: Brain,
    emoji: "🧠",
    color: "category-yellow",
    text: "Learn, explore and discover through playful activities.",
  },
  {
    number: "02",
    name: "Soft Toys",
    count: "85+ Toys",
    icon: Heart,
    emoji: "🧸",
    color: "category-pink",
    text: "Cute, cuddly friends made for endless hugs and smiles.",
  },
  {
    number: "03",
    name: "Outdoor Games",
    count: "70+ Games",
    icon: Dumbbell,
    emoji: "⚽",
    color: "category-blue",
    text: "Get little ones moving, playing and having fun outside.",
  },
  {
    number: "04",
    name: "Building Blocks",
    count: "95+ Sets",
    icon: Blocks,
    emoji: "🧱",
    color: "category-green",
    text: "Build big ideas with creative blocks and construction sets.",
  },
  {
    number: "05",
    name: "Remote Control Toys",
    count: "60+ Toys",
    icon: Gamepad2,
    emoji: "🚗",
    color: "category-purple",
    text: "Exciting cars, vehicles and gadgets for curious minds.",
  },
  {
    number: "06",
    name: "Baby Toys",
    count: "75+ Toys",
    icon: Baby,
    emoji: "👶",
    color: "category-orange",
    text: "Safe and gentle toys specially made for little babies.",
  },
];

function Categories() {
  const { scrollTo } = useStore();

  const handleCategoryClick = (categoryName) => {
    scrollTo("shop", categoryName);
  };

  return (
    <section
      className="categories-section"
      id="categories"
    >
      <div className="categories-container">

        {/* =========================
            SECTION HEADING
        ========================== */}
        <div className="section-heading categories-heading">
          <span className="section-eyebrow">
            <Sparkles size={13} />
            EXPLORE & PLAY
          </span>

          <h2>
            Find their next{" "}
            <span>favourite thing.</span>
          </h2>

          <p>
            From creative learning to outdoor
            adventures, discover toys made to
            bring more fun, curiosity and
            imagination into every day.
          </p>
        </div>

        {/* =========================
            CATEGORY GRID
        ========================== */}
        <div className="categories-grid">
          {categories.map(
            ({
              number,
              name,
              count,
              icon: Icon,
              emoji,
              color,
              text,
            }) => (
              <button
                key={name}
                type="button"
                className={`category-card ${color}`}
                onClick={() =>
                  handleCategoryClick(name)
                }
                aria-label={`Shop ${name}`}
              >
                {/* TOP ROW */}
                <div className="category-card-top">
                  <span className="category-icon">
                    <Icon size={25} />
                  </span>

                  <span className="category-number">
                    {number}
                  </span>
                </div>

                {/* FLOATING TOY */}
                <span
                  className="category-emoji"
                  aria-hidden="true"
                >
                  {emoji}
                </span>

                {/* TEXT CONTENT */}
                <div className="category-content">
                  <span className="category-count">
                    {count}
                  </span>

                  <h3>{name}</h3>

                  <p>{text}</p>
                </div>

                {/* ARROW */}
                <span
                  className="category-arrow"
                  aria-hidden="true"
                >
                  <ArrowUpRight size={18} />
                </span>
              </button>
            )
          )}
        </div>

        {/* =========================
            BOTTOM SHOP CTA
        ========================== */}
        <div className="categories-bottom">
          <div>
            <span>🧸</span>

            <strong>
              Something for every little
              dreamer
            </strong>

            <p>
              Discover playful picks for
              every age and interest.
            </p>
          </div>

          <button
            type="button"
            className="categories-shop-button"
            onClick={() =>
              scrollTo("shop", "All")
            }
          >
            Shop all toys
            <ArrowUpRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Categories;