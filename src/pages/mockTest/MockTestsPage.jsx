import React, { useEffect, useState } from 'react'
import { user_api } from '../../api/axiosClient'
import { Link, useParams, useNavigate } from 'react-router-dom'
import "./MockTests.css"
import Header from '../../pages/home/Header'
import Footer from '../../pages/home/Footer'

export default function MockTestsPage() {
  const { seriesId } = useParams()
  const navigate = useNavigate();
  const [mocktests, setMocktests] = useState([])

  useEffect(() => {
    user_api.get(`/mocktest/testseries/${seriesId}`)
      .then(r => setMocktests(r.data))
      .catch(console.error)
  }, [seriesId])


  const handleOpenInstructions = (mockId) => {
    const features = `
    width=${window.screen.availWidth},
    height=${window.screen.availHeight},
    left=0,
    top=0,
    fullscreen=yes,
    resizable=yes,
    scrollbars=yes
  `;

    const newWin = window.open(`/instructions/mocktest/${mockId}`, "_blank", features);

    if (!newWin) {
      alert("Popup blocked! Please allow popups.");
    } else {
      newWin.moveTo(0, 0);
      newWin.resizeTo(window.screen.availWidth, window.screen.availHeight);
    }
  };

  return (
    <div> <Header />
      <div className="mock-page">
        <div className="mock-header">
          <h1 className="mock-title">📘 Available Mock Tests</h1>
          <p className="mock-subtitle">Prepare smarter with high-quality tests designed for real exam patterns.</p>
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
                <span>⏱ Duration: <strong>{m.durationMinutes} mins</strong></span>
                <span>❓ Questions: <strong>{m.totalQuestions}</strong></span>
              </div>

              <div className="mock-btn-row">
                <button
                  className="mock-btn start-btns"
                  onClick={() => handleOpenInstructions(m.id)}
                >
                  Start Test
                </button>

                {/* <Link to={`/leaderboard/${m.id}`} className="mock-btn leaderboard-btn">
                Leaderboard
              </Link> */}

                {/* <Link className="ts-btn" to={`/attempt/47856/result/1`}>
                ViewResult →
              </Link> */}

                <button
                  className="mock-btn leaderboard-btns"
                  onClick={() => navigate(`/attempt/leaderboard/12/10`)}
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
  )
}
