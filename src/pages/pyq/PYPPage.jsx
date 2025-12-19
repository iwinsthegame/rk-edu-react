import React, { useEffect, useState } from "react";
import "./PYPPage.css";
import { user_api } from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import Header from "../home/Header";
import Footer from "../home/Footer";
import { motion } from "framer-motion";

export default function PYPPage() {
    const [popularExams, setPopularExams] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch popular exams PYQs
        user_api.get("/pyq").then((res) => {
            setPopularExams(res.data || []);
        });

        // Fetch exam categories
        user_api.get("/exam-category").then((res) => {
            const data = res.data || [];
            setCategories(data);
            if (data.length > 0) {
                setSelectedCategory(data[0]);
            }
        });
    }, []);


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
                                onClick={() =>
                                    navigate(`/pyq/exam/${exam.id}`)
                                }
                            >
                                <h3>{exam.examName}</h3>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* EXPLORE ALL EXAMS */}
                <section className="pyp-section">
                    <h2>Complete Previous Year Paper for All Exams</h2>

                    <div className="explore-layout">
                        {/* LEFT CATEGORY */}
                        <div className="category-list">
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className={`category-item ${selectedCategory?.id === cat.id ? "active" : ""
                                        }`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat.name}
                                </div>
                            ))}
                        </div>

                        {/* RIGHT SUBCATEGORY */}
                        <div className="subcategory-grid">
                            {selectedCategory?.subCategories?.length > 0 ? (
                                selectedCategory.subCategories.map((sub) => (
                                    <motion.div
                                        key={sub.id}
                                        className="subcategory-card"
                                        whileHover={{ y: -6, scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() =>
                                            navigate(`/pyq/subcategory/${sub.id}`)
                                        }
                                    >
                                        <h4>{sub.name}</h4>
                                        <p>Previous Year Papers</p>
                                    </motion.div>
                                ))
                            ) : (
                                <p style={{ color: "#666" }}>No subcategories available</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* FAQs SECTION */}
                {/* FAQs SECTION */}
                <section className="pyp-faq-section">
                    <h2 className="faq-title">FAQs</h2>

                    <div className="faq-container">
                        {[
                            {
                                q: "What are Previous Year Question Papers (PYQs)?",
                                a: "PYQs are actual question papers asked in previous government exams. Practicing them helps you understand real exam patterns, difficulty level, and important topics.",
                            },
                            {
                                q: "Which exams' PYQs are available on this platform?",
                                a: "We provide PYQs for major government exams including SSC, Banking, Railways, Defence, UPSC, and various State-level exams. More exams are added regularly.",
                            },
                            {
                                q: "How will solving PYQs help in exam preparation?",
                                a: "Solving PYQs improves accuracy, boosts confidence, highlights frequently asked topics, and helps you manage time effectively in real exams.",
                            },
                            {
                                q: "Can I filter PYQs by year, exam stage, or subject?",
                                a: "Yes, you can easily filter PYQs by exam category, subcategory, exam stage (Prelims/Mains), and year for focused and smart preparation.",
                            },
                            {
                                q: "Are PYQs available in both English and Hindi?",
                                a: "Most PYQs are available in both English and Hindi. Language availability may vary depending on the exam and year.",
                            },
                        ].map((item, index) => (
                            <FAQItem key={index} question={item.q} answer={item.a} />
                        ))}
                    </div>
                </section>



            </div>


            <Footer />
        </>
    );
}
