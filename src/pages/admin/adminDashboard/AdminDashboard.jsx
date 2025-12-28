import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../home/Header";
import "../../../styles/admin/adminDashboard/adminDashboard.css";
export default function AdminDashboard() {
    const navigate = useNavigate();

    const cards = [
        {
            title: "Exam Categories",
            desc: "Create & manage exam categories",
            icon: "🎓",
            path: "/admin/exam-categories"
        },

        {
            title: "Exam Subcategories",
            desc: "Create & manage exam subcategories",
            icon: "📂",
            path: "/admin/exam-subcategories"
        },
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

        {
            title: "Upload PYQ",
            desc: "Upload previous year question papers (PDF)",
            icon: "📄",
            path: "/admin/pyq/upload"
        },
    ];

    return (
        <div><Header />
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
        </div>
    );
}
