// src/components/footer/Footer.jsx
import React from "react";
import "../../styles/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Logo + About */}
                <div className="footer-section footer-about">
                    <h2 className="footer-logo">PrepMaster</h2>
                    <p>
                        Smart learning platform with mock tests, live analytics,
                        and exam-ready content for every aspirant.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>Home</li>
                        <li>Courses</li>
                        <li>Mock Tests</li>
                        <li>About Us</li>
                    </ul>
                </div>

                {/* Exams */}
                <div className="footer-section">
                    <h3>Exams</h3>
                    <ul>
                        <li>SSC</li>
                        <li>Banking</li>
                        <li>Railways</li>
                        <li>Defence</li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-section">
                    <h3>Contact</h3>
                    <ul>
                        <li>Email: support@rk-prepmaster.com</li>
                        <li>Phone: +91 9229109013</li>
                        <li>Location: India</li>
                    </ul>
                </div>

            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} PrepMaster. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
