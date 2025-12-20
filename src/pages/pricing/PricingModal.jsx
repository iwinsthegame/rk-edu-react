import React from "react";
import "./PricingModal.css";
import PricingPage from "./PricingPage";

export default function PricingModal({ open, onClose }) {
    if (!open) return null;

    return (
        <div className="pricing-modal-overlay" onClick={onClose}>
            <div
                className="pricing-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>✕</button>
                <PricingPage />
            </div>
        </div>
    );
}
