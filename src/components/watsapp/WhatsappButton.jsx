import React from "react";
import "./WhatsappButton.css";

export default function WhatsappButton() {
    const phoneNumber = "9229109013";
    const message = encodeURIComponent(
        "Hi, I want guidance regarding courses, test series & PYQs."
    );

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            className="whatsapp-float"
            target="_blank"
            rel="noreferrer"
        >
            <span className="whatsapp-icon">💬</span>
        </a>
    );
}


