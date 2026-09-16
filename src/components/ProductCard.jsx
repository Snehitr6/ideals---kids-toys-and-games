import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
} from "lucide-react";

import { useStore } from "../StoreContext.jsx";

function ProductCard({ product }) {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    openProduct,
  } = useStore();

  const liked = wishlist.some(
    (item) => item.id === product.id
  );

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";

    const fallback =
      event.currentTarget.parentElement.querySelector(
        ".product-image-fallback"
      );

    if (fallback) {
      fallback.style.display = "flex";
    }
  };

  return (
    <article className="product-card">
      {/* ================= IMAGE ================= */}
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={handleImageError}
        />

        {/* Image fallback */}
        <div
          className="product-image-fallback"
          aria-hidden="true"
        >
          <span>{product.emoji || "🧸"}</span>
        </div>

        {/* Category */}
        <span className="product-category">
          {product.category}
        </span>

        {/* Wishlist */}
        <button
          type="button"
          className={`product-wishlist ${
            liked ? "active" : ""
          }`}
          onClick={() => toggleWishlist(product)}
          aria-label={
            liked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          title={
            liked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={18}
            strokeWidth={2}
            fill={
              liked
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="product-content">
        {/* Rating */}
        <div className="product-rating">
          <Star
            size={13}
            strokeWidth={2}
            fill="currentColor"
          />

          <span className="rating-number">
            {product.rating}
          </span>

          <span className="rating-reviews">
            ({product.reviews})
          </span>
        </div>

        {/* Product name */}
        <h3>{product.name}</h3>

        {/* Description */}
        <p>{product.description}</p>

        {/* Bottom */}
        <div className="product-bottom">
          <strong>
            ₹
            {Number(product.price).toLocaleString(
              "en-IN"
            )}
          </strong>

          {/* Actions */}
          <div className="product-actions">
            {/* View */}
            <button
              type="button"
              onClick={() => openProduct(product)}
              title="View product"
              aria-label={`View ${product.name}`}
            >
              <Eye size={17} />
            </button>

            {/* Add to cart */}
            <button
              type="button"
              onClick={() => addToCart(product)}
              title="Add to cart"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag size={17} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;