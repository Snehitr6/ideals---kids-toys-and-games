import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const StoreContext = createContext(null);

function getStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  /* =========================
     CART
  ========================= */
  const [cart, setCart] = useState(() =>
    getStorage("ideals-cart", [])
  );

  /* =========================
     WISHLIST
  ========================= */
  const [wishlist, setWishlist] = useState(() =>
    getStorage("ideals-wishlist", [])
  );

  /* =========================
     USER
  ========================= */
  const [user, setUser] = useState(() =>
    getStorage("ideals-user", null)
  );

  /* =========================
     UI STATES
  ========================= */
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [toast, setToast] = useState(null);

  /* =========================
     FILTER / SEARCH
  ========================= */
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
     LOCAL STORAGE
  ========================= */
  useEffect(() => {
    localStorage.setItem("ideals-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "ideals-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "ideals-user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("ideals-user");
    }
  }, [user]);

  /* =========================
     TOAST
  ========================= */
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2200);

    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (message, type = "success") => {
    setToast({
      message,
      type,
    });
  };

  /* =========================
     CART FUNCTIONS
  ========================= */

  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity,
        },
      ];
    });

    notify(`${product.name} added to cart`);

    setWishlistOpen(false);
    setCartOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    const item = cart.find((product) => product.id === id);

    setCart((previousCart) =>
      previousCart.filter((product) => product.id !== id)
    );

    if (item) {
      notify(`${item.name} removed from cart`);
    }
  };

  const clearCart = () => {
    setCart([]);
    notify("Your cart has been cleared");
  };

  /* =========================
     WISHLIST FUNCTIONS
  ========================= */

  const toggleWishlist = (product) => {
    if (!product) return;

    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlist((previousWishlist) =>
        previousWishlist.filter(
          (item) => item.id !== product.id
        )
      );

      notify(`${product.name} removed from wishlist`);
    } else {
      setWishlist((previousWishlist) => [
        ...previousWishlist,
        product,
      ]);

      notify(`${product.name} saved to wishlist`);
    }
  };

  const removeFromWishlist = (id) => {
    const item = wishlist.find(
      (product) => product.id === id
    );

    setWishlist((previousWishlist) =>
      previousWishlist.filter(
        (product) => product.id !== id
      )
    );

    if (item) {
      notify(`${item.name} removed from wishlist`);
    }
  };

  /* =========================
     PRODUCT MODAL
  ========================= */

  const openProduct = (product) => {
    setSelectedProduct(product);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  /* =========================
     NAVIGATION
  ========================= */

  const scrollTo = (id, category = null) => {
    if (category !== null) {
      setActiveCategory(category);
      setSearchTerm("");
    }

    requestAnimationFrame(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  /* =========================
     SEARCH
  ========================= */

  const searchProducts = (value) => {
    setSearchTerm(value);
    setActiveCategory("All");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  /* =========================
     ACCOUNT
  ========================= */

  const saveUser = (userData) => {
    setUser(userData);

    notify(
      `Welcome ${userData.name}! Your account is ready.`
    );
  };

  /* =========================
     CHECKOUT
  ========================= */

  const openCheckout = () => {
    if (cart.length === 0) {
      notify("Your cart is empty");
      return;
    }

    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
  };

  const completeOrder = () => {
    const orderId = `IDEALS-${Date.now()
      .toString()
      .slice(-6)}`;

    setCart([]);
    setCheckoutOpen(false);
    setOrderSuccess(orderId);

    notify("Your order has been placed successfully!");
  };

  const closeOrderSuccess = () => {
    setOrderSuccess(false);
  };

  /* =========================
     COUNTS / TOTALS
  ========================= */

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [cart]);

  const value = {
    cart,
    wishlist,
    user,

    cartCount,
    cartTotal,

    selectedProduct,

    cartOpen,
    wishlistOpen,
    accountOpen,
    checkoutOpen,
    orderSuccess,

    toast,

    activeCategory,
    searchTerm,

    setCartOpen,
    setWishlistOpen,
    setAccountOpen,
    setCheckoutOpen,

    setActiveCategory,

    notify,

    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,

    toggleWishlist,
    removeFromWishlist,

    openProduct,
    closeProduct,

    scrollTo,

    searchProducts,
    clearSearch,

    saveUser,

    openCheckout,
    closeCheckout,
    completeOrder,
    closeOrderSuccess,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}