import { useEffect, useState } from "react";

import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  User,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
} from "lucide-react";

import { useStore } from "../StoreContext.jsx";

function Navbar() {
  const {
    cart,
    wishlist,
    cartCount,
    cartTotal,

    user,

    cartOpen,
    setCartOpen,

    wishlistOpen,
    setWishlistOpen,

    accountOpen,
    setAccountOpen,

    checkoutOpen,
    openCheckout,
    closeCheckout,

    updateQuantity,
    removeFromCart,
    clearCart,

    addToCart,
    removeFromWishlist,

    scrollTo,

    searchTerm,
    searchProducts,
    clearSearch,

    saveUser,
    completeOrder,
  } = useStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState(searchTerm || "");
  const [scrolled, setScrolled] = useState(false);

  const [accountForm, setAccountForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [accountError, setAccountError] = useState("");

  const [checkoutForm, setCheckoutForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    pincode: "",
    payment: "UPI",
  });

  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =========================
     NAVIGATION
  ========================= */

  const go = (id, category = null) => {
    setMenuOpen(false);
    setSearchOpen(false);

    setCartOpen(false);
    setWishlistOpen(false);
    setAccountOpen(false);

    scrollTo(id, category);
  };

  /* =========================
     SEARCH
  ========================= */

  const submitSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    setSearchOpen(false);
    setMenuOpen(false);

    if (!value) {
      clearSearch();
      go("shop", "All");
      return;
    }

    searchProducts(value);

    setTimeout(() => {
      document
        .getElementById("shop")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  /* =========================
     ACCOUNT
  ========================= */

  const updateAccount = (e) => {
    setAccountForm({
      ...accountForm,
      [e.target.name]: e.target.value,
    });

    setAccountError("");
  };

  const submitAccount = (e) => {
    e.preventDefault();

    if (!accountForm.name.trim()) {
      setAccountError("Please enter your name.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        accountForm.email
      )
    ) {
      setAccountError(
        "Please enter a valid email address."
      );
      return;
    }

    saveUser(accountForm);
    setAccountOpen(false);
  };

  /* =========================
     CHECKOUT
  ========================= */

  const updateCheckout = (e) => {
    setCheckoutForm({
      ...checkoutForm,
      [e.target.name]: e.target.value,
    });

    setCheckoutError("");
  };

  const submitCheckout = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      address,
      city,
      pincode,
    } = checkoutForm;

    if (
      !name.trim() ||
      !email.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      setCheckoutError(
        "Please complete all delivery details."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setCheckoutError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setCheckoutError(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    saveUser({
      name,
      email,
    });

    completeOrder();
  };

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

      <header
        className={`navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="nav-container">
          <button
            className="brand"
            onClick={() => go("home")}
            aria-label="IDEALS home"
          >
            <span className="brand-mark">
              <Sparkles size={19} />
            </span>

            <span className="brand-text">
              IDEALS
              <small>KIDS TOYS & GAMES</small>
            </span>
          </button>

          <nav className="desktop-nav">
            <button onClick={() => go("home")}>
              Home
            </button>

            <button onClick={() => go("shop", "All")}>
              Shop
            </button>

            <button
              onClick={() => go("categories")}
            >
              Categories
            </button>

            <button onClick={() => go("about")}>
              About Us
            </button>

            <button onClick={() => go("contact")}>
              Contact
            </button>
          </nav>

          <div className="nav-actions">
            <button
              className="icon-button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            <button
              className="icon-button nav-count-button"
              onClick={() =>
                setWishlistOpen(true)
              }
              aria-label="Wishlist"
            >
              <Heart size={19} />

              {wishlist.length > 0 && (
                <span>{wishlist.length}</span>
              )}
            </button>

            <button
              className="icon-button nav-count-button"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={19} />

              {cartCount > 0 && (
                <span>{cartCount}</span>
              )}
            </button>

            <button
              className="account-button"
              onClick={() =>
                setAccountOpen(true)
              }
            >
              <User size={15} />
              Account
            </button>

            <button
              className="mobile-menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      {/* =========================
          SEARCH
      ========================= */}

      {searchOpen && (
        <div
          className="search-overlay"
          onClick={() => setSearchOpen(false)}
        >
          <form
            className="search-box"
            onSubmit={submitSearch}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <Search size={19} />

            <input
              autoFocus
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search toys, games..."
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  clearSearch();
                }}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}

            <button
              className="search-go"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* =========================
          MOBILE MENU
      ========================= */}

      {menuOpen && (
        <>
          <div
            className="mobile-backdrop"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="mobile-drawer">
            <div className="mobile-drawer-header">
              <button
                className="brand"
                onClick={() => go("home")}
              >
                <span className="brand-mark">
                  <Sparkles size={18} />
                </span>

                <span className="brand-text">
                  IDEALS
                  <small>
                    KIDS TOYS & GAMES
                  </small>
                </span>
              </button>

              <button
                className="drawer-close"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                <X size={19} />
              </button>
            </div>

            <div className="mobile-search">
              <Search size={17} />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitSearch(e);
                  }
                }}
                placeholder="Search toys..."
              />
            </div>

            <nav className="mobile-nav">
              <button
                onClick={() => go("home")}
              >
                <span>01</span>
                Home
              </button>

              <button
                onClick={() =>
                  go("shop", "All")
                }
              >
                <span>02</span>
                Shop
              </button>

              <button
                onClick={() =>
                  go("categories")
                }
              >
                <span>03</span>
                Categories
              </button>

              <button
                onClick={() => go("about")}
              >
                <span>04</span>
                About Us
              </button>

              <button
                onClick={() =>
                  go("contact")
                }
              >
                <span>05</span>
                Contact
              </button>
            </nav>

            <div className="mobile-drawer-footer">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setWishlistOpen(true);
                }}
              >
                <Heart size={16} />
                Wishlist ({wishlist.length})
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setCartOpen(true);
                }}
              >
                <ShoppingBag size={16} />
                Cart ({cartCount})
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setAccountOpen(true);
                }}
              >
                <User size={16} />
                Account
              </button>
            </div>
          </aside>
        </>
      )}

      {/* =========================
          CART
      ========================= */}

      {cartOpen && (
        <div
          className="side-panel-layer"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="side-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="side-panel-head">
              <div>
                <span>YOUR BAG</span>
                <h3>Shopping cart</h3>
              </div>

              <button
                onClick={() =>
                  setCartOpen(false)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="side-panel-body">
              {cart.length === 0 ? (
                <div className="panel-empty">
                  <div>🛒</div>

                  <h3>
                    Your cart is empty
                  </h3>

                  <p>
                    Add something fun for
                    your little dreamer.
                  </p>

                  <button
                    onClick={() =>
                      go("shop", "All")
                    }
                  >
                    Explore toys
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    className="cart-line"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-line-info">
                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <div className="line-controls">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus size={13} />
                        </button>

                        <b>
                          {item.quantity}
                        </b>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus size={13} />
                        </button>

                        <button
                          className="line-delete"
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="side-panel-footer">
                <div className="cart-total">
                  <span>Total</span>

                  <strong>
                    ₹
                    {cartTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <button
                  className="checkout-button"
                  onClick={openCheckout}
                >
                  Proceed to checkout
                  <ArrowRight size={17} />
                </button>

                <button
                  className="clear-cart"
                  onClick={clearCart}
                >
                  Clear cart
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* =========================
          WISHLIST
      ========================= */}

      {wishlistOpen && (
        <div
          className="side-panel-layer"
          onClick={() =>
            setWishlistOpen(false)
          }
        >
          <aside
            className="side-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="side-panel-head">
              <div>
                <span>SAVED PICKS</span>
                <h3>Wishlist</h3>
              </div>

              <button
                onClick={() =>
                  setWishlistOpen(false)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="side-panel-body">
              {wishlist.length === 0 ? (
                <div className="panel-empty">
                  <div>♡</div>

                  <h3>
                    No saved toys yet
                  </h3>

                  <p>
                    Tap the heart on any toy
                    to save it here.
                  </p>

                  <button
                    onClick={() =>
                      go("shop", "All")
                    }
                  >
                    Browse toys
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    className="cart-line"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-line-info">
                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <button
                        className="mini-add"
                        onClick={() =>
                          addToCart(item)
                        }
                      >
                        Add to cart
                        <ShoppingBag
                          size={13}
                        />
                      </button>

                      <button
                        className="clear-cart"
                        onClick={() =>
                          removeFromWishlist(
                            item.id
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      )}

      {/* =========================
          ACCOUNT
      ========================= */}

      {accountOpen && (
        <div
          className="side-panel-layer"
          onClick={() =>
            setAccountOpen(false)
          }
        >
          <aside
            className="side-panel account-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="side-panel-head">
              <div>
                <span>IDEALS FAMILY</span>
                <h3>Your account</h3>
              </div>

              <button
                onClick={() =>
                  setAccountOpen(false)
                }
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="account-box"
              onSubmit={submitAccount}
            >
              <div className="account-avatar">
                <User size={26} />
              </div>

              <h3>
                {user
                  ? `Welcome back, ${user.name}`
                  : "Welcome to IDEALS"}
              </h3>

              <p>
                Save your favourites and
                keep your toy orders together.
              </p>

              <input
                name="name"
                value={accountForm.name}
                onChange={updateAccount}
                placeholder="Your name"
              />

              <input
                name="email"
                type="email"
                value={accountForm.email}
                onChange={updateAccount}
                placeholder="Email address"
              />

              {accountError && (
                <p className="newsletter-error">
                  {accountError}
                </p>
              )}

              <button type="submit">
                Save account
                <ArrowRight size={16} />
              </button>
            </form>
          </aside>
        </div>
      )}

      {/* =========================
          CHECKOUT
      ========================= */}

      {checkoutOpen && (
        <div
          className="side-panel-layer"
          onClick={closeCheckout}
        >
          <aside
            className="side-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="side-panel-head">
              <div>
                <span>IDEALS CHECKOUT</span>
                <h3>Complete order</h3>
              </div>

              <button
                onClick={closeCheckout}
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="account-box"
              onSubmit={submitCheckout}
            >
              <div className="account-avatar">
                <CreditCard size={25} />
              </div>

              <h3>
                Delivery details
              </h3>

              <p>
                Total payable:{" "}
                <strong>
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </p>

              <input
                name="name"
                value={checkoutForm.name}
                onChange={updateCheckout}
                placeholder="Full name"
              />

              <input
                name="email"
                type="email"
                value={checkoutForm.email}
                onChange={updateCheckout}
                placeholder="Email address"
              />

              <input
                name="address"
                value={checkoutForm.address}
                onChange={updateCheckout}
                placeholder="Delivery address"
              />

              <input
                name="city"
                value={checkoutForm.city}
                onChange={updateCheckout}
                placeholder="City"
              />

              <input
                name="pincode"
                value={checkoutForm.pincode}
                onChange={updateCheckout}
                placeholder="6-digit pincode"
                maxLength={6}
                inputMode="numeric"
              />

              <select
                name="payment"
                value={checkoutForm.payment}
                onChange={updateCheckout}
                style={{
                  width: "100%",
                  height: "48px",
                  border:
                    "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "0 14px",
                  marginTop: "10px",
                  background: "#fff",
                  outline: "none",
                }}
              >
                <option value="UPI">
                  UPI
                </option>

                <option value="Card">
                  Credit / Debit Card
                </option>

                <option value="COD">
                  Cash on Delivery
                </option>
              </select>

              {checkoutError && (
                <p className="newsletter-error">
                  {checkoutError}
                </p>
              )}

              <button type="submit">
                Place order
                <Check size={16} />
              </button>

              <div className="newsletter-note">
                <MapPin size={12} />
                Secure demo checkout
              </div>
            </form>
          </aside>
        </div>
      )}
    </>
  );
}

export default Navbar;