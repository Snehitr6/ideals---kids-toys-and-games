import {
  X,
  Home,
  ShoppingBag,
  LayoutGrid,
  Info,
  Mail,
  Heart,
  User,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { useStore } from "../StoreContext.jsx";

function MobileMenu({ isOpen, onClose }) {
  const {
    wishlist,
    cartCount,
    user,
    setWishlistOpen,
    setAccountOpen,
    scrollTo,
  } = useStore();

  if (!isOpen) return null;

  const handleNavigation = (id, category = null) => {
    onClose?.();

    setTimeout(() => {
      scrollTo(id, category);
    }, 180);
  };

  const handleWishlist = () => {
    onClose?.();

    setTimeout(() => {
      setWishlistOpen(true);
    }, 180);
  };

  const handleAccount = () => {
    onClose?.();

    setTimeout(() => {
      setAccountOpen(true);
    }, 180);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="mobile-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="mobile-drawer-header">
          <button
            type="button"
            className="brand"
            onClick={() => handleNavigation("home")}
            aria-label="Go to home"
          >
            <span className="brand-mark">
              🧸
            </span>

            <span className="brand-text">
              IDEALS
              <small>TOYS & GAMES</small>
            </span>
          </button>

          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close menu"
            title="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        {/* Small intro */}
        <div className="mobile-drawer-intro">
          <Sparkles size={16} />

          <span>
            Big fun starts here
          </span>
        </div>

        {/* Navigation */}
        <nav className="mobile-nav">
          <button
            type="button"
            onClick={() => handleNavigation("home")}
          >
            <Home size={20} />

            <span className="mobile-nav-label">
              Home
            </span>

            <ArrowUpRight size={17} />
          </button>

          <button
            type="button"
            onClick={() => handleNavigation("shop", "All")}
          >
            <ShoppingBag size={20} />

            <span className="mobile-nav-label">
              Shop
            </span>

            <ArrowUpRight size={17} />
          </button>

          <button
            type="button"
            onClick={() => handleNavigation("categories")}
          >
            <LayoutGrid size={20} />

            <span className="mobile-nav-label">
              Categories
            </span>

            <ArrowUpRight size={17} />
          </button>

          <button
            type="button"
            onClick={() => handleNavigation("about")}
          >
            <Info size={20} />

            <span className="mobile-nav-label">
              About Us
            </span>

            <ArrowUpRight size={17} />
          </button>

          <button
            type="button"
            onClick={() => handleNavigation("contact")}
          >
            <Mail size={20} />

            <span className="mobile-nav-label">
              Contact
            </span>

            <ArrowUpRight size={17} />
          </button>
        </nav>

        {/* Quick actions */}
        <div className="mobile-menu-actions">
          <button
            type="button"
            className="mobile-quick-action"
            onClick={handleWishlist}
          >
            <span className="mobile-quick-icon">
              <Heart size={19} />
            </span>

            <span>
              <strong>Wishlist</strong>
              <small>
                {wishlist.length} saved{" "}
                {wishlist.length === 1
                  ? "toy"
                  : "toys"}
              </small>
            </span>

            <ArrowUpRight size={16} />
          </button>

          <button
            type="button"
            className="mobile-quick-action"
            onClick={() =>
              handleNavigation("shop", "All")
            }
          >
            <span className="mobile-quick-icon cart">
              <ShoppingBag size={19} />

              {cartCount > 0 && (
                <b>
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </b>
              )}
            </span>

            <span>
              <strong>Shopping Bag</strong>
              <small>
                {cartCount === 0
                  ? "Your bag is empty"
                  : `${cartCount} ${
                      cartCount === 1
                        ? "item"
                        : "items"
                    } in your bag`}
              </small>
            </span>

            <ArrowUpRight size={16} />
          </button>

          <button
            type="button"
            className="mobile-quick-action"
            onClick={handleAccount}
          >
            <span className="mobile-quick-icon account">
              <User size={19} />
            </span>

            <span>
              <strong>
                {user?.name
                  ? user.name
                  : "My Account"}
              </strong>

              <small>
                {user
                  ? "View your profile"
                  : "Sign in or create account"}
              </small>
            </span>

            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Footer */}
        <div className="mobile-drawer-footer">
          <div className="mobile-drawer-footer-toy">
            🧸
          </div>

          <div>
            <strong>
              Play. Learn. Imagine.
            </strong>

            <p>
              Discover something special
              for every little dreamer.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MobileMenu;