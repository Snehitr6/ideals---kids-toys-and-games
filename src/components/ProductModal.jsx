import {
  useEffect,
  useState,
} from "react";

import {
  X,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Check,
} from "lucide-react";

import { useStore } from "../StoreContext.jsx";

function ProductModal() {
  const {
    selectedProduct,
    closeProduct,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useStore();

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [selectedProduct]);

  if (!selectedProduct) {
    return null;
  }

  const liked = wishlist.some(
    (item) =>
      item.id === selectedProduct.id
  );

  const handleAdd = () => {
    addToCart(
      selectedProduct,
      quantity
    );

    closeProduct();
  };

  return (
    <div
      className="product-modal-backdrop"
      onClick={closeProduct}
    >
      <div
        className="product-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={closeProduct}
          aria-label="Close product"
        >
          <X size={20} />
        </button>

        <div className="modal-image">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
          />
        </div>

        <div className="modal-details">
          <span className="modal-category">
            {selectedProduct.category}
          </span>

          <h2>
            {selectedProduct.name}
          </h2>

          <div className="modal-rating">
            <Star
              size={15}
              fill="currentColor"
            />

            {selectedProduct.rating}

            <span>
              · {selectedProduct.reviews}{" "}
              reviews
            </span>
          </div>

          <div className="modal-price">
            ₹
            {selectedProduct.price.toLocaleString(
              "en-IN"
            )}
          </div>

          <p>
            {selectedProduct.description}
          </p>

          <div className="quantity-row">
            <span>Quantity</span>

            <div className="quantity-control">
              <button
                onClick={() =>
                  setQuantity((value) =>
                    Math.max(1, value - 1)
                  )
                }
              >
                <Minus size={15} />
              </button>

              <strong>{quantity}</strong>

              <button
                onClick={() =>
                  setQuantity(
                    (value) => value + 1
                  )
                }
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button
              className="modal-cart"
              onClick={handleAdd}
            >
              <ShoppingBag size={18} />
              Add to cart
            </button>

            <button
              className={`modal-wish ${
                liked ? "active" : ""
              }`}
              onClick={() =>
                toggleWishlist(
                  selectedProduct
                )
              }
              aria-label="Wishlist"
            >
              <Heart
                size={18}
                fill={
                  liked
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          </div>

          <div className="modal-safe">
            <Check size={15} />
            Safe checkout · Child-friendly
            products · Easy returns
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;