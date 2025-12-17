import React, { useEffect, useMemo, useState } from "react";
import "./PyqPage.css";
import { user_api } from "../../api/axiosClient";
import Header from "../home/Header";
import Footer from "../home/Footer";

export default function PyqPage() {
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState("All");
    const [subCategory, setSubCategory] = useState("All");
    const [year, setYear] = useState("All");

    useEffect(() => {
        user_api.get("/pyq").then(res => {
            setPyqs(res.data || []);
            setLoading(false);
        });
    }, []);

    /* ----- filters ----- */
    const categories = useMemo(
        () => ["All", ...new Set(pyqs.map(p => p.examCategory))],
        [pyqs]
    );

    const subCategories = useMemo(() => {
        if (category === "All") return ["All"];
        return ["All", ...new Set(
            pyqs.filter(p => p.examCategory === category)
                .map(p => p.examSubCategory)
        )];
    }, [category, pyqs]);

    const years = useMemo(
        () => ["All", ...new Set(pyqs.map(p => p.year))].sort((a, b) => b - a),
        [pyqs]
    );

    const filtered = pyqs.filter(p =>
        (category === "All" || p.examCategory === category) &&
        (subCategory === "All" || p.examSubCategory === subCategory) &&
        (year === "All" || p.year === year)
    );

    return (
        <div>
            <Header />

            <div className="pyq-page">
                <h2 className="pyq-title">Previous Year Question Papers</h2>

                {/* Filters */}
                <div className="pyq-filters">
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        {categories.map(c => <option key={c}>{c}</option>)}
                    </select>

                    <select value={subCategory} onChange={e => setSubCategory(e.target.value)}>
                        {subCategories.map(sc => <option key={sc}>{sc}</option>)}
                    </select>

                    <select value={year} onChange={e => setYear(e.target.value)}>
                        {years.map(y => <option key={y}>{y}</option>)}
                    </select>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="pyq-loading">Loading PYQs...</div>
                ) : filtered.length === 0 ? (
                    <div className="pyq-empty">No PYQs found</div>
                ) : (
                    <div className="pyq-grid">
                        {filtered.map(p => (
                            <PyqCard key={p.id} pyq={p} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

/* ---------- Card ---------- */

function PyqCard({ pyq }) {
    return (
        <div className="pyq-card">
            <div className="pyq-card-top">
                <span className="pyq-badge">{pyq.examCategory}</span>
                <span className="pyq-year">{pyq.year}</span>
            </div>

            <h3 className="pyq-name">{pyq.title}</h3>
            <p className="pyq-sub">{pyq.examSubCategory}</p>

            <div className="pyq-actions">
                {/* <a
                    href={pyq.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                >
                    View PDF
                </a> */}

                <a
                    href={`http://localhost:8080${pyq.pdfUrl}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    View PDF
                </a>


                {/* <a
                    href={pyq.pdfUrl}
                    download
                    className="btn-solid"
                >
                    Download
                </a> */}

                <a
                    href={`http://localhost:8080${pyq.pdfUrl}`}
                    download
                >
                    Download
                </a>


            </div>
        </div>
    );
}
