import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { examCategories, examList } from "./examData";
import HomePage from "./HomePage";
import { Link, useParams } from 'react-router-dom'

export default function Header() {
    const [openExam, setOpenExam] = useState(false);
    const [activeCategory, setActiveCategory] = useState(0); // default to first category
    const dropdownRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenExam(false);
                setActiveCategory(0); // reset to first category
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);




    return (
        <div className="header-wrapper">

            {/* HEADER TOP BAR */}
            <header className="tb-header">
                <div className="tb-logo">
                    <span className="logo-icon">🎓</span>
                    PrepMaster
                </div>

                <nav className="tb-nav">
                    {/* WRAP BOTH TRIGGER + DROPDOWN */}
                    <div
                        className="tb-nav-wrapper"
                        ref={dropdownRef}
                    >
                        {/* CLICK TO TOGGLE DROPDOWN */}
                        <div
                            className="tb-nav-item"
                            onClick={() => setOpenExam(prev => !prev)}
                        >
                            Exams ▾
                        </div>

                        {/* MEGA MENU */}
                        {openExam && (
                            <div className="exam-dropdown">

                                {/* LEFT CATEGORY LIST */}
                                <div className="exam-left">
                                    {examCategories.map((cat, idx) => (
                                        <div
                                            key={idx}
                                            className={`exam-cat-item ${activeCategory === idx ? "active" : ""}`}
                                            onMouseEnter={() => setActiveCategory(idx)}
                                        >
                                            <span className="cat-icon">{cat.icon}</span>
                                            {cat.name}
                                            <span className="arrow">›</span>
                                        </div>
                                    ))}
                                </div>

                                {/* RIGHT SUB CATEGORY LIST */}
                                <div className="exam-right">
                                    {examList[activeCategory].map((exam, idx) => (
                                        <div key={idx} className="exam-card">
                                            <span className="exam-logo">{exam.icon}</span>
                                            {exam.name}
                                            <span className="exam-go">›</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link to={`/testseries/`} className="tb-nav-item">
                        Test Series
                    </Link>


                    {/* <a className="tb-nav-item">Test Series</a> */}
                    <a className="tb-nav-item">PYQ</a>

                </nav>
                {/* RIGHT SIDE */}
                <a className="tb-nav-item hd-start-btn">Let's Start</a>
            </header>
        </div>
    );
}
