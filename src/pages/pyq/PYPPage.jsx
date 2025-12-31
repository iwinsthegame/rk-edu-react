import React, { useEffect, useState } from "react";
import "./PYPPage.css";
import { user_api, API_BASE_URL } from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import Header from "../home/Header";
import Footer from "../home/Footer";
import { motion } from "framer-motion";

export default function PYPPage() {
    const [popularExams, setPopularExams] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        user_api.get("/exam-category").then((res) => {
            const data = res.data || [];
            setPopularExams(data);
            setCategories(data);
            if (data.length > 0) {
                setSelectedCategory(data[0]);
            }
        });
    }, []);

    /* 🔍 SEARCH ACROSS ALL CATEGORIES + SUBCATEGORIES */
    const searchedResults = searchText
        ? categories
            .map((cat) => {
                const categoryMatch = cat.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase());

                const matchedSubs = cat.subCategories?.filter((sub) =>
                    sub.name.toLowerCase().includes(searchText.toLowerCase())
                );

                return categoryMatch || matchedSubs?.length
                    ? {
                        ...cat,
                        subCategories: categoryMatch
                            ? cat.subCategories
                            : matchedSubs,
                    }
                    : null;
            })
            .filter(Boolean)
        : [];

    function FAQItem({ question, answer }) {
        const [open, setOpen] = useState(false);

        return (
            <motion.div
                className={`faq-item ${open ? "open" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
            >
                <div className="faq-question" onClick={() => setOpen(!open)}>
                    <span>{question}</span>
                    <span className="faq-icon">{open ? "−" : "+"}</span>
                </div>

                {open && (
                    <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {answer}
                    </motion.div>
                )}
            </motion.div>
        );
    }

    return (
        <>
            <Header />

            <div className="pyp-container">
                {/* HERO */}
                <div className="pyp-hero">
                    <h1>Previous Year Question Papers (PYQs)</h1>
                    <p>Practice real exam papers and boost your exam readiness</p>
                </div>



                {/* EXPLORE ALL EXAMS */}
                <section className="pyp-section">
                    <h2>Complete Previous Year Paper for All Exams</h2>

                    {/* SEARCH BOX */}
                    <div className="explore-search">
                        <input
                            type="text"
                            placeholder="Search exam, stage or paper..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    {/* SEARCH RESULTS */}
                    {searchText ? (
                        <div className="search-results">
                            {searchedResults.length > 0 ? (
                                searchedResults.map((cat) => (
                                    <div key={cat.id} className="search-category">
                                        <h4>{cat.name}</h4>

                                        <div className="subcategory-grid">
                                            {cat.subCategories.map((sub) => (
                                                <motion.div
                                                    key={sub.id}
                                                    className="subcategory-card"
                                                    whileHover={{
                                                        y: -6,
                                                        scale: 1.03,
                                                    }}
                                                    whileTap={{ scale: 0.97 }}
                                                    onClick={() =>
                                                        navigate(
                                                            `/pyq/subcategory/${sub.id}`
                                                        )
                                                    }
                                                >
                                                    <h4>{sub.name}</h4>
                                                    <p>Previous Year Papers</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-result">
                                    No matching PYQs found
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="explore-layout">
                            {/* LEFT CATEGORY */}
                            <div className="category-list">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className={`category-item ${selectedCategory?.id === cat.id
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setSelectedCategory(cat)
                                        }
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>

                            {/* RIGHT SUBCATEGORY */}
                            <div className="subcategory-grid">
                                {selectedCategory?.subCategories?.length >
                                    0 ? (
                                    selectedCategory.subCategories.map(
                                        (sub) => (
                                            <motion.div
                                                key={sub.id}
                                                className="subcategory-card"
                                                whileHover={{
                                                    y: -6,
                                                    scale: 1.03,
                                                }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() =>
                                                    navigate(
                                                        `/pyq/subcategory/${sub.id}`
                                                    )
                                                }
                                            >
                                                <h4>{sub.name}</h4>
                                                <p>Previous Year Papers</p>
                                            </motion.div>
                                        )
                                    )
                                ) : (
                                    <p style={{ color: "#666" }}>
                                        No subcategories available
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </section>


                {/* POPULAR EXAMS */}
                <section className="pyp-section">
                    <h2>PYQs for Popular Govt. Exams ⭐</h2>

                    <div className="popular-grid">
                        {popularExams.map((exam) => (
                            <motion.div
                                key={exam.id}
                                className="exam-card"
                                whileHover={{ y: -10, scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                onClick={() => navigate(`/pyq/exam/${exam.id}`)}
                            >
                                <img
                                    src={
                                        exam.logoUrl
                                            ? `${API_BASE_URL}${exam.logoUrl}`
                                            : "/default-exam.png"
                                    }
                                    alt={exam.name}
                                    className="exam-logo"
                                />
                                <h3 className="exam-title">{exam.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </section>



                {/* FAQs */}
                <section className="pyp-faq-section">
                    <h2 className="faq-title">FAQs</h2>

                    <div className="faq-container">
                        {[
                            {
                                q: "What are Previous Year Question Papers (PYQs)?",
                                a: "PYQs are actual question papers asked in previous government exams."
                            },
                            {
                                q: "Which exams' PYQs are available on this platform?",
                                a: "PYQs are available for SSC, Banking, Railways, Defence, UPSC, and State-level exams."
                            },
                            {
                                q: "How do PYQs help in exam preparation?",
                                a: "PYQs help you understand exam patterns, frequently asked topics, and difficulty level."
                            },
                            {
                                q: "Are PYQs available exam-wise and year-wise?",
                                a: "Yes, you can filter PYQs by exam, stage, and year for focused practice."
                            },
                            {
                                q: "Can I download PYQ PDFs?",
                                a: "Yes, PYQs are available in downloadable PDF format for offline practice."
                            },
                            {
                                q: "Are PYQs available for different exam stages like Prelims and Mains?",
                                a: "Yes, PYQs are organized by exam stages such as Prelims, Mains, Tier 1, and Tier 2."
                            },
                            {
                                q: "Do PYQs include real exam-level questions?",
                                a: "Yes, all PYQs are taken from actual exams conducted in previous years."
                            },
                            {
                                q: "How often are new PYQs added?",
                                a: "New PYQs are added regularly after each major government exam."
                            },
                            {
                                q: "Can beginners start preparation using PYQs?",
                                a: "Yes, PYQs are highly recommended for beginners to understand exam trends early."
                            },
                            {
                                q: "Are PYQs available for free?",
                                a: "Many PYQs are free, while some premium papers may require access."
                            }
                        ]
                            .map((item, index) => (
                                <FAQItem
                                    key={index}
                                    question={item.q}
                                    answer={item.a}
                                />
                            ))}
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
