import React from "react";
import "../../styles/TestSeries.css";



/* A skeleton card that uses the same CSS file for styles/shimmer definitions */
export default function ShimmerLoader() {
    return (
        <div className="ts-card shimmer-card" aria-hidden>
            <div className="ts-card-top" style={{ background: "linear-gradient(180deg,#f0f0f0,#f7f7f7)" }}>
                <div className="ts-card-badge shimmer-box" style={{ width: 56, height: 56, borderRadius: 28 }} />
                <div className="ts-card-user-badge shimmer-box" style={{ width: 110, height: 28, borderRadius: 20 }} />
            </div>

            <div className="ts-card-body">
                <div className="shimmer-line" style={{ width: "70%", height: 18, borderRadius: 6 }} />
                <div className="shimmer-line" style={{ width: "45%", height: 14, borderRadius: 6, marginTop: 6 }} />
                <div style={{ height: 8 }} />
                <div className="shimmer-line" style={{ width: "40%", height: 14, borderRadius: 6 }} />
                <div style={{ flex: 1 }} />
                <div className="shimmer-line" style={{ width: "100%", height: 44, borderRadius: 10 }} />
            </div>
        </div>
    );
}



