import React from "react";
import "../../styles/TestSeries.css";
import ShimmerLoader from "./ShimmerLoader";
import Studyimage from "../../assets/studyimage.jpg";
import { Link } from "react-router-dom";
import Header from "../../pages/home/Header";
import Footer from "../../pages/home/Footer";
import { useTestSeries } from "../../hooks/mocktest/useTestSeries";

export default function TestSeriesPage() {
  const {
    loading,
    error,
    filtered,
    categories,
    subCategories,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    search,
    setSearch,
  } = useTestSeries();

  // console.log("useTestSeries values:", {
  //   loading,
  //   error,
  //   filtered,
  //   categories,
  //   subCategories,
  //   selectedCategory,
  //   selectedSubCategory,
  //   search,
  // });

  return (
    <div className="ts-header" ><Header />
      <div className="ts-page">
        <div className="ts-header-row">
          <h2 className="ts-title">Test Series</h2>

          <div className="ts-search-wrap">
            <div className="ts-search-box">
              <svg className="ts-search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 20.49 21.49 19 15.5 14zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
              </svg>
              <input
                placeholder="Search Test Series"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="ts-search-input"
              />
            </div>
          </div>
        </div>


        {/* 🔹 SUBCATEGORY BAR */}
        {selectedCategory !== "All" && subCategories.length > 0 && (
          <div className="ts-top-filters sub">
            {subCategories.map(sub => (
              <button
                key={sub}
                className={`ts-pill ${sub === selectedSubCategory ? "active" : ""}`}
                onClick={() => setSelectedSubCategory(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        )}



        <div className="ts-layout">
          {/* Left sidebar */}
          <aside className="ts-sidebar">
            {categories.map(cat => (
              <div
                key={cat}
                className={`ts-sidebar-item ${cat === selectedCategory ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubCategory("All");
                }}
              >
                {cat}
              </div>
            ))}
          </aside>

          {/* right content */}
          <section className="ts-content">
            {loading ? (
              // show shimmer grid
              <div className="ts-cards-grid">
                {Array.from({ length: 6 }).map((_, i) => <ShimmerLoader key={i} />)}
              </div>
            ) : error ? (
              <div className="ts-error">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="ts-empty">No test series found.</div>
            ) : (
              <div className="ts-cards-grid">
                {filtered.map(series => (
                  <TestSeriesCard key={series.id} series={series} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* Card component */
function TestSeriesCard({ series }) {
  // choose gradient / badge color by id for variety
  const gradientIndex = series.id ? series.id % 6 : 0;
  const gradients = [
    "linear-gradient(180deg,#EACCFB 0%, #F4EDF7 100%)",
    "linear-gradient(180deg,#E6F7FF 0%, #F7FBFF 100%)",
    "linear-gradient(180deg,#FFF4E6 0%, #FFFAF5 100%)",
    "linear-gradient(180deg,#EAF8F1 0%, #F7FBF8 100%)",
    "linear-gradient(180deg,#F0F7FF 0%, #FBFDFF 100%)",
    "linear-gradient(180deg,#F7E9EE 0%, #FEF6F9 100%)"
  ];
  const headerStyle = { background: gradients[gradientIndex] };

  const logoSrc = series.logoUrl || "/assets/default-badge.png"; // replace if you have a logo field
  const totalTests = (series.mockTests && series.mockTests.length) || 0;

  return (
    <article className="ts-card">
      <div className="ts-card-top" style={headerStyle}>
        <div className="ts-card-badge">
          <img src={logoSrc} alt="logo" onError={(e) => { e.target.onerror = null; e.target.src = Studyimage; }} />
        </div>
        <div className="ts-card-user-badge">⚡ {Math.floor(Math.random() * 900) + 100}k Users</div>
      </div>

      <div className="ts-card-body">
        <h3 className="ts-card-title">{series.title}</h3>

        <div className="ts-meta-row">
          <div className="ts-total">{totalTests} Total Tests</div>
          <div className="ts-free">| <span className="ts-free-number"> {Math.max(0, Math.floor(totalTests * 0.05))} Free Tests</span></div>
        </div>

        <div className="ts-languages">English, Hindi</div>

        <hr className="ts-sep" />

        {/* <ul className="ts-features">
            {(series.mockTests || []).slice(0, 4).map(test => (
              <li key={test.id}>{test.title}</li>
            ))}
            {totalTests > 4 && <li className="ts-more">+{totalTests - 4} more tests</li>}
          </ul> */}

        <div className="ts-card-footer">
          <div className="ts-duration">{series.mockTests && series.mockTests[0] ? `${series.mockTests[0].durationMinutes} mins` : ""}</div>
          <button className="ts-view-btn">
            <Link className="ts-btn" to={`/mocktest/testseries/${series.id}`}>
              View Test Series →
            </Link>
          </button>
        </div>
      </div>
    </article>


  );
}
