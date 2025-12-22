import React from "react";
import "./PricingPage.css";

const plans = [
    {
        id: 52,
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
        id: 53,
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
        id: 54,
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
];

export default function PricingPage() {

    /* ================= PAYMENT HANDLER ================= */
    const startPayment = async (plan) => {
        try {
            // 👉 Replace userId with logged-in user id later
            const userId = 1;

            const res = await fetch(
                `http://localhost:8080/api/payment/create?userId=${userId}&productId=${plan.id}`,
                { method: "POST" }
            );

            const order = await res.json();

            const options = {
                key: "rzp_test_RuN6bp4O2XRGoR", // 🔑 replace
                amount: order.amount * 100,
                currency: "INR",
                name: "RK Edu",
                description: `${plan.name} Plan`,
                order_id: order.razorpayOrderId,

                handler: async function () {
                    await fetch(
                        `http://localhost:8080/api/payment/verify?razorpayOrderId=${order.razorpayOrderId}`,
                        { method: "POST" }
                    );
                    alert("🎉 Payment Successful! Plan Activated");
                },

                theme: {
                    color: "#0ea5e9",
                },
            };

            new window.Razorpay(options).open();
        } catch (err) {
            alert("Payment failed. Try again!");
            console.error(err);
        }
    };

    return (
        <section className="pricing-container">
            {plans.map((plan) => (
                <div
                    key={plan.id}
                    className={`pricing-card ${plan.popular ? "popular" : ""}`}
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

                    {/* 🔥 PAYMENT BUTTON */}
                    <button
                        className="choose-btn"
                        onClick={() => startPayment(plan)}
                    >
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
    );
}
