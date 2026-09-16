import { useMemo } from "react";
import { Search, Sparkles, X } from "lucide-react";

import ProductCard from "./ProductCard.jsx";
import { useStore } from "../StoreContext.jsx";
import products from "../data/products.js";

function FeaturedProducts() {
  const {
    activeCategory,
    searchTerm,
    setActiveCategory,
    clearSearch,
  } = useStore();

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const clearFilters = () => {
    setActiveCategory("All");
    clearSearch();
  };

  return (
    <section
      id="shop"
      className="products-section"
    >
      <div className="products-container">

        {/* HEADER */}
        <div className="products-header">

          <div className="products-heading">
            <span className="section-eyebrow">
              <Sparkles size={15} />
              OUR TOY COLLECTION
            </span>

            <h2>
              Find Their Next
              <span> Favorite Toy</span>
            </h2>

            <p>
              Discover playful, creative and educational toys
              made for curious little minds.
            </p>
          </div>

          {/* CATEGORY FILTER */}
          <div className="products-filter">

            <button
              type="button"
              className={
                activeCategory === "All"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setActiveCategory("All")}
            >
              All Toys
            </button>

            <button
              type="button"
              className={
                activeCategory === "Educational Toys"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setActiveCategory("Educational Toys")
              }
            >
              Educational
            </button>

            <button
              type="button"
              className={
                activeCategory === "Soft Toys"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setActiveCategory("Soft Toys")
              }
            >
              Soft Toys
            </button>

            <button
              type="button"
              className={
                activeCategory === "Outdoor Games"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setActiveCategory("Outdoor Games")
              }
            >
              Outdoor
            </button>

            <button
              type="button"
              className={
                activeCategory === "Building Blocks"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setActiveCategory("Building Blocks")
              }
            >
              Building
            </button>

          </div>
        </div>

        {/* SEARCH RESULT */}
        {searchTerm && (
          <div className="search-result-bar">

            <div>
              <Search size={17} />

              <span>
                Search results for{" "}
                <strong>"{searchTerm}"</strong>
              </span>

              <small>
                {filteredProducts.length} product
                {filteredProducts.length !== 1
                  ? "s"
                  : ""}
              </small>
            </div>

            <button
              type="button"
              onClick={clearSearch}
            >
              <X size={16} />
              Clear Search
            </button>

          </div>
        )}

        {/* ACTIVE CATEGORY */}
        {!searchTerm && activeCategory !== "All" && (
          <div className="search-result-bar">

            <div>
              <Sparkles size={17} />

              <span>
                Showing{" "}
                <strong>{activeCategory}</strong>
              </span>

              <small>
                {filteredProducts.length} product
                {filteredProducts.length !== 1
                  ? "s"
                  : ""}
              </small>
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveCategory("All")
              }
            >
              <X size={16} />
              Show All
            </button>

          </div>
        )}

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">

            {filteredProducts.map((product, index) => (
              <div
                className="product-grid-item"
                key={product.id}
                style={{
                  animationDelay: `${index * 70}ms`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}

          </div>
        ) : (
          /* EMPTY STATE */
          <div className="products-empty">

            <div className="products-empty-icon">
              <Search size={32} />
            </div>

            <h3>
              No toys found
            </h3>

            <p>
              We couldn't find any toys matching your
              current search or category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              <Sparkles size={17} />
              Explore All Toys
            </button>

          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedProducts;