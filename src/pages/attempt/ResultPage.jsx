import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { user_api } from "../../api/axiosClient";
import "../../styles/ResultPage.css";

export default function ResultPage() {
    const { attemptId } = useParams();
    const navigate = useNavigate();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    // animation trigger
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (!attemptId) return;
        user_api
            .get(`/attempt/${attemptId}/result/2`)
            .then((res) => {
                setResult(res.data);
                setLoading(false);

                // delay animation so bars rise from bottom
                setTimeout(() => setAnimate(true), 200);
            })
            .catch((err) => {
                console.error("Result fetch error:", err);
                setLoading(false);
            });
    }, [attemptId]);

    if (loading) return <div className="res-loading">Loading Result...</div>;
    if (!result) return <div className="res-loading">No Result Found</div>;

    const {
        mockTestTitle,
        totalMarks,
        totalQuestions,
        correctCount,
        wrongCount,
        unattemptedCount,
        percentage,
        startTime,
        endTime,
        status
    } = result;

    // Time
    const timeTakenSec = (new Date(endTime) - new Date(startTime)) / 1000;
    const timeTakenMin = Math.round(timeTakenSec / 60);

    const accuracy = ((correctCount / totalQuestions) * 100).toFixed(1);

    // bar heights
    const barCorrect = animate ? (correctCount / totalQuestions) * 100 : 0;
    const barWrong = animate ? (wrongCount / totalQuestions) * 100 : 0;
    const barSkipped = animate ? (unattemptedCount / totalQuestions) * 100 : 0;

    return (
        <div className="res-root">

            {/* HEADER */}
            <div className="res-header">
                <div>
                    <h2>🏆 Test Result</h2>
                    <p className="test-subtitle">{mockTestTitle}</p>
                </div>
                <div className="attempt-id">Attempt #{attemptId}</div>
            </div>

            {/* TOP GRID */}
            <div className="top-grid">
                <div className="score-card">
                    <div className="score-circle">
                        <div className="score-main">{percentage}%</div>
                        <div className="score-label">Overall Score</div>
                    </div>
                </div>

                <div className="metrics-grid">
                    <div className="metric-card correct">
                        <h4>Correct</h4>
                        <p>{correctCount}</p>
                    </div>
                    <div className="metric-card wrong">
                        <h4>Wrong</h4>
                        <p>{wrongCount}</p>
                    </div>
                    <div className="metric-card skipped">
                        <h4>Unattempted</h4>
                        <p>{unattemptedCount}</p>
                    </div>
                    <div className="metric-card accuracy">
                        <h4>Accuracy</h4>
                        <p>{accuracy}%</p>
                    </div>
                    <div className="metric-card time">
                        <h4>Time Taken</h4>
                        <p>{timeTakenMin} mins</p>
                    </div>
                </div>
            </div>



            <div className="chart-summary-row">
                {/* CHART */}
                <div className="chart-card">
                    <h3>📊 Performance Graph</h3>

                    <div className="chart-bars">

                        <div className="bar-group">
                            <div className="bar-wrapper">
                                <div className="bar-value">{barCorrect}%</div>
                                <div className="bar correct-bar" style={{ height: `${barCorrect}px` }}></div>
                            </div>
                            <span className="bar-label">Correct</span>
                        </div>

                        <div className="bar-group">
                            <div className="bar-wrapper">
                                <div className="bar-value">{barWrong}%</div>
                                <div className="bar wrong-bar" style={{ height: `${barWrong}px` }}></div>
                            </div>
                            <span className="bar-label">Wrong</span>
                        </div>

                        <div className="bar-group">
                            <div className="bar-wrapper">
                                <div className="bar-value">{barSkipped}%</div>
                                <div className="bar skip-bar" style={{ height: `${barSkipped}px` }}></div>
                            </div>
                            <span className="bar-label">Unattempted</span>
                        </div>

                    </div>
                </div>

                {/* SUMMARY BOX */}
                <div className="summary-box">
                    <div className="summary-row">
                        <span>Total Questions:</span>
                        <strong>{totalQuestions}</strong>
                    </div>
                    <div className="summary-row">
                        <span>Total Marks:</span>
                        <strong>{totalMarks}</strong>
                    </div>
                    <div className="summary-row">
                        <span>Status:</span>
                        <strong>{status}</strong>
                    </div>
                </div>
            </div>




            <div className="res-actions">
                <button className="btn review" onClick={() => navigate(`/attempt/${attemptId}/review`)}>
                    🔍 Review Answers
                </button>

                <button className="btn home" onClick={() => navigate("/")}>
                    🏠 Go Home
                </button>
            </div>
        </div>
    );
}
