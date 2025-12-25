import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const cards = [
        {
            title: "Create Test Series",
            desc: "Create new test series with mocks",
            icon: "📚",
            path: "/admin/testseries/create"
        },
        {
            title: "Create Mock Test",
            desc: "Add mock tests to series",
            icon: "🧪",
            path: "/admin/mocktest/create"
        },

        {
            title: "Create Question",
            desc: "Add questions to mock tests",
            icon: "❓",
            path: "/admin/questions/create"
        },

        // {
        //     title: "Edit Test Series",
        //     desc: "Edit, publish or draft test series",
        //     icon: "✏️",
        //     path: "/admin/testseries/edit"
        // },

        // {
        //     title: "Reorder Mock Tests",
        //     desc: "Drag & drop mock tests",
        //     icon: "🔀",
        //     path: "/admin/mocktest/reorder"
        // },
        // {
        //     title: "Add Questions",
        //     desc: "MCQ, Numeric & Descriptive",
        //     icon: "❓",
        //     path: "/admin/questions"
        // },
        // {
        //     title: "Discussions",
        //     desc: "Moderate doubts & discussions",
        //     icon: "💬",
        //     path: "/admin/discussions"
        // },
        // {
        //     title: "Reviews & Ratings",
        //     desc: "Monitor user feedback",
        //     icon: "⭐",
        //     path: "/admin/reviews"
        // },
        // {
        //     title: "Draft / Publish",
        //     desc: "Control visibility",
        //     icon: "🚀",
        //     path: "/admin/publish"
        // },
        // {
        //     title: "Analytics",
        //     desc: "Users, attempts & performance",
        //     icon: "📊",
        //     path: "/admin/analytics"
        // }
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage Test Series, Mock Tests & Content</p>
            </div>

            <div className="admin-grid">
                {cards.map((c, i) => (
                    <div
                        key={i}
                        className="admin-card"
                        onClick={() => navigate(c.path)}
                    >
                        <div className="icon">{c.icon}</div>
                        <h3>{c.title}</h3>
                        <p>{c.desc}</p>
                        <span className="action">Open →</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
