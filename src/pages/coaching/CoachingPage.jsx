import React from "react";
import "./CoachingPage.css";
import Header from "../home/Header";
import Footer from "../home/Footer";

const coachings = [
    {
        id: 1,
        name: "RK Edu SSC Coaching",
        mode: "Online + Offline",
        description:
            "Complete SSC preparation with live classes, PYQs, doubt sessions & test series.",
        rating: 4.8,
        students: "25k+",
        batches: "New batch starts every month",
        tag: "TOP RATED",
    },
    {
        id: 2,
        name: "Banking Exams Coaching",
        mode: "Online",
        description:
            "Focused coaching for PO, Clerk & SO with daily practice & mock tests.",
        rating: 4.6,
        students: "18k+",
        batches: "Weekend & weekday batches",
        tag: "POPULAR",
    },
    {
        id: 3,
        name: "UPSC Foundation Coaching",
        mode: "Offline",
        description:
            "Conceptual learning, current affairs & answer writing program.",
        rating: 4.9,
        students: "10k+",
        batches: "Limited seats available",
        tag: "PREMIUM",
    },
];

export default function CoachingPage() {
    return (
        <>
            <Header />

            {/* HERO */}
            <section className="coaching-hero">
                <h1>Our Coaching Programs</h1>
                <p>
                    Join expert-led coaching programs designed to help you crack
                    competitive exams with confidence 🎯
                </p>
            </section>

            {/* COACHING LIST */}
            <section className="coaching-container">
                {coachings.map((c) => (
                    <div key={c.id} className="coaching-card">
                        <span className={`coaching-tag ${c.tag.toLowerCase().replace(" ", "")}`}>
                            {c.tag}
                        </span>

                        <h3>{c.name}</h3>
                        <p className="coaching-mode">📍 {c.mode}</p>

                        <p className="coaching-desc">{c.description}</p>

                        <div className="coaching-meta">
                            <span>⭐ {c.rating}</span>
                            <span>👥 {c.students}</span>
                        </div>

                        <div className="coaching-batch">
                            🚀 {c.batches}
                        </div>

                        <button className="coaching-btn">
                            View Coaching Details
                        </button>
                    </div>
                ))}
            </section>

            <Footer />
        </>
    );
}
