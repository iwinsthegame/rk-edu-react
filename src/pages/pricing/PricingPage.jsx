import React from "react";
import "./PricingPage.css";
import Header from "../home/Header";
import Footer from "../home/Footer";

const plans = [
    {
        id: 1,
        name: "Starter",
        tag: "83% OFF",
        description: "Perfect for beginners",
        price: 69,
        popular: false,
        features: [
            "Access to PYQs",
            "Limited Mock Tests",
            "Basic Test Analysis",
            "1 Exam Category",
        ],
    },
    {
        id: 2,
        name: "Premium",
        tag: "75% OFF",
        description: "Most popular for serious aspirants",
        price: 149,
        popular: true,
        extra: "+2 months free",
        features: [
            "All PYQs",
            "Full Test Series",
            "Advanced Analytics",
            "All Exam Categories",
            "Courses Access",
        ],
    },
    {
        id: 3,
        name: "Pro",
        tag: "64% OFF",
        description: "For focused rank improvement",
        price: 249,
        popular: false,
        extra: "+2 months free",
        features: [
            "Everything in Premium",
            "Live Doubt Sessions",
            "Mock Interviews",
            "Priority Support",
        ],
    },
    // {
    //     id: 4,
    //     name: "Elite",
    //     tag: "65% OFF",
    //     description: "Complete coaching experience",
    //     price: 599,
    //     popular: false,
    //     extra: "+2 months free",
    //     features: [
    //         "All Pro Features",
    //         "Live Coaching Classes",
    //         "Mentor Guidance",
    //         "Offline Support",
    //     ],
    // },
];

export default function PricingPage() {
    return (
        <>


            {/* HERO */}
            {/* <section className="pricing-hero">
                <h1>Choose the Right Plan for Your Success</h1>
                <p>
                    One subscription. Unlimited preparation for exams, test series,
                    PYQs, courses & coaching 🚀
                </p>
            </section> */}

            {/* PRICING */}
            <section className="pricing-container">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`pricing-card ${plan.popular ? "popular" : ""
                            }`}
                    >
                        {plan.popular && (
                            <div className="popular-badge">MOST POPULAR</div>
                        )}

                        <span className="discount-badge">{plan.tag}</span>

                        <h3>{plan.name}</h3>
                        <p className="plan-desc">{plan.description}</p>

                        <div className="price">
                            ₹{plan.price}
                            <span>/mo</span>
                        </div>

                        {plan.extra && (
                            <div className="extra">{plan.extra}</div>
                        )}

                        <button className="choose-btn">
                            Choose Plan
                        </button>

                        <div className="divider" />

                        <ul className="feature-list">
                            {plan.features.map((f, i) => (
                                <li key={i}>✔ {f}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>


        </>
    );
}
