import React, { useState, useEffect, useRef } from "react";
import "./HomePage.css";
import { FiBookOpen, FiPlayCircle, FiUsers, FiAward } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { user_api } from "../../api/axiosClient";

export default function HomePage() {

    const [examCategories, setExamCategories] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const maxVisible = 50; // show first 6 by default

    const sliderRef = useRef(null);

    const scroll = (dir) => {
        if (!sliderRef.current) return;
        sliderRef.current.scrollBy({
            left: dir === "left" ? -300 : 300,
            behavior: "smooth",
        });
    };




    useEffect(() => {
        user_api.get("/exam-category")
            .then((res) => {
                // Ensure the response is always an array
                const payload = Array.isArray(res.data) ? res.data : [res.data];
                setExamCategories(payload);
            })
            .catch((err) => {
                console.error("Error fetching exam categories:", err);
            });
    }, []);

    const visibleCategories = showAll ? examCategories : examCategories.slice(0, maxVisible);

    return (
        <div className="hp-root">




            {/* 🌟 HERO SECTION */}
            <section className="hp-hero">
                <div className="hp-hero-content">
                    <h1>
                        Master Every Exam With
                        <span className="highlight"> Smart Learning</span>
                    </h1>
                    <p className="hp-sub">
                        AI-powered mock tests, real-time leaderboards, and deep analytics to boost your score.
                    </p>
                    <div className="hp-hero-buttons">
                        <button className="btn-primary">Start Learning</button>
                        <button className="btn-outline">Explore Courses</button>
                    </div>
                </div>

                <div className="hp-hero-art">
                    <div className="floating-card fc1">🔥 2000+ Mock Tests</div>
                    <div className="floating-card fc2">🏆 Top Ranking Insights</div>
                    <div className="floating-card fc3">📚 500+ Video Lessons</div>
                </div>
            </section>

            {/* 📊 STATS SECTION */}
            <section className="hp-stats">
                <div className="stat-card"><FiUsers /> <h3>45,000+</h3><p>Active Students</p></div>
                <div className="stat-card"><FiBookOpen /> <h3>2,500+</h3><p>Mock Tests</p></div>
                <div className="stat-card"><FiPlayCircle /> <h3>900+</h3><p>Video Classes</p></div>
                <div className="stat-card"><FiAward /> <h3>95%</h3><p>Success Rate</p></div>
            </section>

            {/* 🧩 CATEGORIES */}

            <section className="hp-section">
                <div className="explore-section">
                    <h2 className="explore-section-title">Explore Categories</h2>

                    <div className="hp-slider-wrapper">
                        <button className="hp-arrow left" onClick={() => scroll("left")}>
                            ‹
                        </button>

                        {/* VIEWPORT ADDED */}
                        <div className="hp-slider-viewport">
                            <div className="hp-category-slider" ref={sliderRef}>
                                {(showAll ? examCategories : examCategories.slice(0, maxVisible)).map(
                                    (category) => (
                                        <div key={category.id} className="category-pill">
                                            {category.name}
                                        </div>
                                    )
                                )}

                                {examCategories.length > maxVisible && !showAll && (
                                    <div
                                        className="category-pill see-more-pill"
                                        onClick={() => setShowAll(true)}
                                    >
                                        + See More
                                    </div>
                                )}

                                {showAll && (
                                    <div
                                        className="category-pill see-more-pill"
                                        onClick={() => setShowAll(false)}
                                    >
                                        − Show Less
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className="hp-arrow right" onClick={() => scroll("right")}>
                            ›
                        </button>
                    </div>
                </div>
            </section>







            {/* 📚 FEATURED COURSES */}
            {/* 📚 FEATURED COURSES */}
            <section className="hp-section">
                <h2 className="section-title">Featured Courses</h2>

                <div className="hp-carousel">
                    {[
                        {
                            title: "SSC CGL Complete Course",
                            stats: "400+ Videos • 150 Mock Tests",
                            img: "https://picsum.photos/seed/ssc-exam/800/400",

                            tag: "Bestseller",
                        },
                        {
                            title: "UPSC Prelims Crash Course",
                            stats: "250+ Videos • 80 Mock Tests",
                            img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
                            tag: "New",
                        },
                        {
                            title: "Bank PO Mastery",
                            stats: "300+ Videos • 120 Mock Tests",
                            img: "https://images.unsplash.com/photo-1513258496099-48168024aec0",
                            tag: "Popular",
                        },
                        {
                            title: "Railways Group D",
                            stats: "200+ Videos • 90 Mock Tests",
                            img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
                            tag: "Trending",
                        },
                    ].map((course, idx) => (
                        <div key={idx} className="course-card">
                            <div
                                className="course-img"
                                style={{ backgroundImage: `url(${course.img})` }}
                            >
                                <span className="course-tag">{course.tag}</span>
                            </div>

                            <div className="course-body">
                                <h3>{course.title}</h3>
                                <p>{course.stats}</p>
                                <button className="btn-small">Start Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>






            {/* 🌟 TESTIMONIALS */}
            <section className="hp-section">
                <h2 className="section-title">What Students Say</h2>

                <div className="hp-testimonials">
                    {[1, 2, 3].map((t) => (
                        <div key={t} className="testimonial-card">
                            <div className="testimonial-header">
                                <img
                                    src="https://i.pravatar.cc/80?img=12"
                                    alt="Student"
                                    className="testimonial-avatar"
                                />

                                <div>
                                    <h4>Rohit Kumar</h4>
                                    <span>SSC Aspirant</span>
                                </div>
                            </div>

                            <p className="testimonial-text">
                                “This platform helped me boost my score by 42% in just 1 month!
                                The analytics and leaderboard are game-changing.”
                            </p>

                            <div className="testimonial-rating">
                                ⭐ ⭐ ⭐ ⭐ ⭐
                            </div>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}
