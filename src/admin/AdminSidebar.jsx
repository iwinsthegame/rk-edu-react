import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const menu = [
        { name: "Dashboard", icon: "🏠", path: "/admin" },
        { name: "Exam Categories", icon: "📋", path: "/admin/exam-categories" },
        { name: "Exam Subcategories", icon: "📂", path: "/admin/exam-subcategories" },
        { name: "Create Test Series", icon: "📚", path: "/admin/testseries/create" },
        { name: "Create Mock Test", icon: "🧪", path: "/admin/mocktest/create" },
        { name: "Create Question", icon: "❓", path: "/admin/questions/create" },
        { name: "Upload PYQ", icon: "📄", path: "/admin/pyq/upload" },
    ];

    return (
        <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                {!collapsed && <h2 className="logo">Admin Panel</h2>}
                <button
                    className="collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? "➡️" : "⬅️"}
                </button>
            </div>

            {menu.map((item, i) => (
                <NavLink
                    key={i}
                    to={item.path}
                    className={({ isActive }) =>
                        isActive ? "menu-item active" : "menu-item"
                    }
                >
                    <span className="menu-icon">{item.icon}</span>
                    {!collapsed && <span className="menu-text">{item.name}</span>}
                </NavLink>
            ))}
        </aside>
    );
}
