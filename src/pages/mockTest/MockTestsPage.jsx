import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../pages/home/Header";
import Footer from "../../pages/home/Footer";
import { useMocktest } from "../../hooks/mocktest/useMocktest";
import "../../styles/MockTests.css";

export default function MockTestsPage() {
  const { seriesId } = useParams();
  const navigate = useNavigate();

  const { mocktests, openInstructions } = useMocktest(seriesId);

  return (
    <div>
      <Header />

      <div className="mock-page">
        <div className="mock-header">
          <h1 className="mock-title">📘 Available Mock Tests</h1>
          <p className="mock-subtitle">
            Prepare smarter with high-quality tests designed for real exam patterns.
          </p>
        </div>

        <div className="mock-grid fade-in">
          {mocktests.length === 0 && (
            <p className="no-tests">No mock tests available for this series.</p>
          )}

          {mocktests.map((m) => (
            <div className="mock-card premium-card" key={m.id}>
              <div className="mock-card-header">
                <h3>{m.title}</h3>
              </div>

              <div className="mock-info">
                <span>
                  ⏱ Duration: <strong>{m.durationMinutes} mins</strong>
                </span>
                <span>
                  ❓ Questions: <strong>{m.totalQuestions}</strong>
                </span>
              </div>

              <div className="mock-btn-row">
                <button
                  className="mock-btn start-btns"
                  onClick={() => openInstructions(m.id)}
                >
                  Start Test
                </button>

                <button
                  className="mock-btn leaderboard-btns"
                  onClick={() =>
                    navigate(`/attempt/leaderboard/${m.id}/20`)
                  }
                >
                  Leaderboard
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
