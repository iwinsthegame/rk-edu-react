import React from "react";
import useLeaderboard from "../../hooks/mocktest/useLeaderboard";
import "../../styles/LeaderboardPage.css";

export default function LeaderboardPage() {
    const { leaders, loading } = useLeaderboard();

    if (loading) return <div className="lb-loading">Loading Leaderboard...</div>;

    return (
        <div className="lb-root">

            <h2 className="lb-title">🏆 Leaderboard</h2>

            {/* ⭐ TOP 3 CARDS */}
            <div className="lb-top-container">
                {leaders.slice(0, 3).map((item, idx) => (
                    <div key={idx} className={`lb-top-card rank-${idx + 1}`}>
                        <div className="rank-badge">#{idx + 1}</div>
                        <h3>{item.studentName}</h3>
                        <p className="top-score">{item.percentage.toFixed(1)}%</p>
                        <span className="top-marks">Marks: {item.totalMarks}</span>
                    </div>
                ))}
            </div>

            {/* 📋 FULL TABLE */}
            <div className="lb-table-container">
                <table className="lb-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Student</th>
                            <th>Percentage</th>
                            <th>Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaders.map((item, index) => (
                            <tr key={index}>
                                <td className="rank-number">
                                    <span className={`rank-chip rank-${index + 1}`}>
                                        #{index + 1}
                                    </span>
                                </td>
                                <td>{item.studentName}</td>
                                <td>{item.percentage.toFixed(1)}%</td>
                                <td>{item.totalMarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
