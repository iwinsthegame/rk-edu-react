import React, { useEffect, useMemo, useState } from "react";
import "./PyqPage.css";
import { user_api, API_BASE_URL } from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import Header from "../home/Header";
import Footer from "../home/Footer";
import PricingModal from "../pricing/PricingModal";

const ITEMS_PER_PAGE = 5;

export default function PyqPage() {
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { subCategoryId } = useParams();

    const [year, setYear] = useState("All");
    const [stage, setStage] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [openPricing, setOpenPricing] = useState(false);

    useEffect(() => {
        user_api.get(`/pyq/subcategory/${subCategoryId}`).then((res) => {
            setPyqs(res.data || []);
            setLoading(false);
        });
    }, [subCategoryId]);

    /* -------- UNIQUE YEARS -------- */
    const years = useMemo(
        () => [...new Set(pyqs.map((p) => p.year))].sort((a, b) => b - a),
        [pyqs]
    );

    /* -------- UNIQUE STAGES -------- */
    const stages = useMemo(
        () => [...new Set(pyqs.map((p) => p.examStage))],
        [pyqs]
    );

    /* -------- FILTER LOGIC -------- */
    const filtered = useMemo(() => {
        const searchText = search.toLowerCase();

        return pyqs.filter((p) =>
            (year === "All" || p.year === year) &&
            (stage.length === 0 || stage.includes(p.examStage)) &&
            (
                p.title.toLowerCase().includes(searchText) ||
                p.examStage.toLowerCase().includes(searchText) ||
                String(p.year).includes(searchText)
            )
        );
    }, [pyqs, year, stage, search]);

    /* -------- PAGINATION -------- */
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filtered.slice(start, start + ITEMS_PER_PAGE);
    }, [filtered, page]);

    /* Reset page when filter/search changes */
    useEffect(() => {
        setPage(1);
    }, [year, stage, search]);

    const toggleStage = (val) => {
        setStage((prev) =>
            prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
        );
    };

    return (
        <>
            <Header />

            {/* ===== PYQ INFO BANNER ===== */}
            <div className="pyq-info-banner">
                <div className="pyq-info-content">
                    <div className="pyq-info-left">
                        <span className="pyq-tag">Previous Year Questions</span>
                        <h2>Practice PYQs to Crack Exams Faster 🚀</h2>
                        <p>
                            Solve real exam questions from previous years to understand
                            exam pattern, difficulty level, and frequently asked topics.
                        </p>

                        <div className="pyq-info-stats">
                            <div>
                                <strong>10+ Years</strong>
                                <span>PYQs Covered</span>
                            </div>
                            <div>
                                <strong>Exam-wise</strong>
                                <span>Organised Papers</span>
                            </div>
                            <div>
                                <strong>Free + Paid</strong>
                                <span>Access Available</span>
                            </div>
                        </div>
                    </div>

                    <div className="pyq-info-right">
                        <div className="pyq-icon-box">📘</div>
                        <div className="pyq-icon-box">📝</div>
                        <div className="pyq-icon-box">🎯</div>
                    </div>
                </div>
            </div>






            <div className="pyq-page">
                {/* LEFT */}
                <div className="pyq-left">
                    <h1 className="pyq-heading">
                        Question Papers <span>(Total Tests: {filtered.length})</span>
                    </h1>

                    {/* 🔍 SEARCH BAR */}
                    <div className="pyq-search">
                        <input
                            type="text"
                            placeholder="Search by exam name, year, or stage..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button onClick={() => setSearch("")}>✕</button>
                        )}
                    </div>

                    {loading ? (
                        <div className="pyq-loading">Loading...</div>
                    ) : (
                        paginatedData.map((p, i) => (
                            <PyqCard key={p.id} pyq={p} index={i} onUnlock={() => setOpenPricing(true)} />
                        ))
                    )}

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="pyq-pagination">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                ← Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={page === i + 1 ? "active" : ""}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT FILTERS */}
                <div className="pyq-right">
                    {/* STAGE FILTER */}
                    <div className="filter-box">
                        <h4>Select Stage</h4>
                        {stages.map((s) => (
                            <label key={s}>
                                <input
                                    type="checkbox"
                                    checked={stage.includes(s)}
                                    onChange={() => toggleStage(s)}
                                />
                                {s.replace("_", " ")}
                            </label>
                        ))}
                    </div>

                    {/* YEAR FILTER */}
                    <div className="filter-box">
                        <h4>Select Year</h4>
                        {years.map((y) => (
                            <label key={y}>
                                <input
                                    type="checkbox"
                                    checked={year === y}
                                    onChange={() =>
                                        setYear((prev) => (prev === y ? "All" : y))
                                    }
                                />
                                {y}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* ✅ SINGLE PRICING MODAL */}
            <PricingModal
                open={openPricing}
                onClose={() => setOpenPricing(false)}
            />
            <Footer />
        </>
    );
}

/* ---------- CARD ---------- */

function PyqCard({ pyq, index, onUnlock }) {
    const isFree = index === 0;

    return (
        <div className="pyq-card">
            <div className="pyq-card-top">
                <div className="badges">
                    <span className={`badge ${isFree ? "free" : "pro"}`}>
                        {isFree ? "FREE" : "PAID"}
                    </span>
                </div>

                <div className="users">⚡ {Math.floor(Math.random() * 50) + 5}k Users</div>
            </div>

            <h3 className="pyq-title">{pyq.title}</h3>

            <div className="pyq-meta">
                <span>📌 {pyq.examStage.replace("_", " ")}</span>
                <span>📅 {pyq.year}</span>
            </div>

            <div className="pyq-actions">
                <a
                    href={`${API_BASE_URL}${pyq.pdfUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                >
                    View PDF
                </a>

                {isFree ? (
                    <button className="btn-solid">Start Now</button>
                ) : (
                    <button className="btn-lock" onClick={onUnlock}>🔒 Unlock Now</button>
                )}
            </div>
        </div>
    );
}
