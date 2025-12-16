import React from "react";
import Header from "./Header";
import HomePage from "./HomePage";
import "./MainPage.css";
import Footer from "./Footer";

export default function MainPage() {
    return (
        <div className="main-page">
            <Header />
            <main className="main-content">
                <HomePage />
            </main>
            <Footer />
        </div>
    );
}
