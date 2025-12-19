import React from "react";
import "./CoursePage.css";
import Header from "../home/Header";
import Footer from "../home/Footer";

const courses = [
    {
        id: 1,
        title: "SSC CGL Complete Course 2025",
        description: "Full syllabus coverage with PYQs, mock tests & live classes.",
        tag: "BESTSELLER",
        level: "Beginner to Advanced",
        duration: "6 Months",
        price: "₹2,999",
        oldPrice: "₹4,999",
    },
    {
        id: 2,
        title: "Banking PO + Clerk Crash Course",
        description: "High-weightage topics with daily practice & tests.",
        tag: "NEW",
        level: "Intermediate",
        duration: "3 Months",
        price: "₹1,999",
        oldPrice: "₹3,499",
    },
    {
        id: 3,
        title: "UPSC Prelims Foundation",
        description: "Conceptual clarity + MCQs + current affairs.",
        tag: "POPULAR",
        level: "Advanced",
        duration: "12 Months",
        price: "₹7,999",
        oldPrice: "₹12,999",
    },
];

export default function CoursePage() {
    return (
        <>
            <Header />

            {/* HERO SECTION */}
            <section className="course-hero">
                <h1>Explore Our Courses</h1>
                <p>
                    Learn from structured courses designed by experts to crack
                    competitive exams faster 🚀
                </p>
            </section>

            {/* COURSE LIST */}
            <section className="course-container">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <span className={`course-tag ${course.tag.toLowerCase()}`}>
                            {course.tag}
                        </span>

                        <h3>{course.title}</h3>
                        <p className="course-desc">{course.description}</p>

                        <div className="course-meta">
                            <span>📊 {course.level}</span>
                            <span>⏱ {course.duration}</span>
                        </div>

                        <div className="course-price">
                            <span className="new-price">{course.price}</span>
                            <span className="old-price">{course.oldPrice}</span>
                        </div>

                        <button className="course-btn">View Course</button>
                    </div>
                ))}
            </section>

            <Footer />
        </>
    );
}
