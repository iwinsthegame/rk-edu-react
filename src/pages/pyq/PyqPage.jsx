import React, { useEffect, useMemo, useState } from "react";
import "./PyqPage.css";
import { user_api } from "../../api/axiosClient";
import Header from "../home/Header";
import Footer from "../home/Footer";

export default function PyqPage() {
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [year, setYear] = useState("All");
    const [stage, setStage] = useState([]);

    useEffect(() => {
        user_api.get("/pyq").then((res) => {
            setPyqs(res.data || []);
            setLoading(false);
        });
    }, []);

    const years = useMemo(
        () => [...new Set(pyqs.map((p) => p.year))].sort((a, b) => b - a),
        [pyqs]
    );

    const filtered = pyqs.filter(
        (p) =>
            (year === "All" || p.year === year) &&
            (stage.length === 0 || stage.includes(p.examSubCategory))
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
                        SSC CGL 2025 Question Paper <span>(Total Tests: {filtered.length})</span>
                    </h1>

                    {loading ? (
                        <div className="pyq-loading">Loading...</div>
                    ) : (
                        filtered.map((p, i) => <PyqCard key={p.id} pyq={p} index={i} />)
                    )}
                </div>

                {/* RIGHT FILTERS */}
                <div className="pyq-right">
                    <div className="filter-box">
                        <h4>Select Stage</h4>
                        {["Tier I", "Tier II"].map((s) => (
                            <label key={s}>
                                <input
                                    type="checkbox"
                                    checked={stage.includes(s)}
                                    onChange={() => toggleStage(s)}
                                />
                                {s}
                            </label>
                        ))}
                    </div>

                    <div className="filter-box">
                        <h4>Select Year</h4>
                        {years.map((y) => (
                            <label key={y}>
                                <input
                                    type="checkbox"
                                    checked={year === y}
                                    onChange={() => setYear(y)}
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
                    {/* {isFree && <span className="badge must">MUST ATTEMPT</span>} */}
                </div>

                <div className="users">⚡ {Math.floor(Math.random() * 50) + 5}k Users</div>
            </div>

            <h3 className="pyq-title">{pyq.title}</h3>

            <div className="pyq-meta">
                <span>📝 100 Questions</span>
                <span>🏆 200 Marks</span>
                <span>⏱ 60 Mins</span>
            </div>

            <div className="pyq-lang">🌐 English, Hindi + 6 More</div>

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
