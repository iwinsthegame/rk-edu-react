import React, { useEffect, useState } from "react";
import "./PYPPage.css";
import { user_api } from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import Header from "../home/Header";
import Footer from "../home/Footer";

export default function PYPPage() {
    const [popularExams, setPopularExams] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        user_api.get("/pyq").then(res => {
            setPopularExams(res.data || []);
        });

        user_api.get("/exam-category").then(res => {
            setCategories(res.data || []);
            setSelectedCategory(res.data?.[0]);
        });
    }, []);

    return (
        <div><Header />
            <div className="pyp-container">

                {/* HERO */}
                <div className="pyp-hero">
                    <h1>Previous Year Question Papers (PYQs)</h1>
                    <p>Practice real exam papers and boost your exam readiness</p>
                </div>

                {/* POPULAR */}
                <section className="pyp-section">
                    <h2>Previous Year Papers for Popular Govt. Exams</h2>

                    <div className="popular-grid">
                        {popularExams.map(exam => (
                            <div className="exam-card" key={exam.id}>
                                <h3>{exam.examName}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EXPLORE */}
                <section className="pyp-section">
                    <h2>Explore Previous Year Papers of All Exams</h2>

                    <div className="explore-layout">

                        {/* LEFT CATEGORY */}
                        <div className="category-list">
                            {categories.map(cat => (
                                <div
                                    key={cat.id}
                                    className={`category-item ${selectedCategory?.id === cat.id ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat.name}
                                </div>
                            ))}
                        </div>

                        {/* RIGHT SUBCATEGORY */}
                        <div className="subcategory-grid">
                            {selectedCategory?.subCategories?.map(sub => (
                                <div
                                    key={sub.id}
                                    className="subcategory-card"
                                    onClick={() => navigate(`/pyq/subcategory/${sub.id}`)}
                                >
                                    <h4>{sub.name}</h4>
                                    <p>Previous Year Papers</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
}
