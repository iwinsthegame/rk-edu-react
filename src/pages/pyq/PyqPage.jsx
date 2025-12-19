import React, { useEffect, useMemo, useState } from "react";
import "./PyqPage.css";
import { user_api } from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import Header from "../home/Header";
import Footer from "../home/Footer";

export default function PyqPage() {
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { subCategoryId } = useParams();

    const [year, setYear] = useState("All");
    const [stage, setStage] = useState([]);

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

    /* -------- UNIQUE STAGES FROM BACKEND -------- */
    const stages = useMemo(
        () => [...new Set(pyqs.map((p) => p.examStage))],
        [pyqs]
    );

    /* -------- FILTER LOGIC -------- */
    const filtered = pyqs.filter(
        (p) =>
            (year === "All" || p.year === year) &&
            (stage.length === 0 || stage.includes(p.examStage))
    );

    const toggleStage = (val) => {
        setStage((prev) =>
            prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
        );
    };

    return (
        <>
            <Header />

            <div className="pyq-page">
                {/* LEFT */}
                <div className="pyq-left">
                    <h1 className="pyq-heading">
                        Question Papers <span>(Total Tests: {filtered.length})</span>
                    </h1>

                    {loading ? (
                        <div className="pyq-loading">Loading...</div>
                    ) : (
                        filtered.map((p, i) => (
                            <PyqCard key={p.id} pyq={p} index={i} />
                        ))
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

            <Footer />
        </>
    );
}

/* ---------- CARD ---------- */

function PyqCard({ pyq, index }) {
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
                    href={`http://localhost:8080${pyq.pdfUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                >
                    View PDF
                </a>

                {isFree ? (
                    <button className="btn-solid">Start Now</button>
                ) : (
                    <button className="btn-lock">🔒 Unlock Now</button>
                )}
            </div>
        </div>
    );
}
