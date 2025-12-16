import React from "react";
import { useParams } from "react-router-dom";
import { useInstructionsPage } from "../../hooks/mocktest/useInstructionsPage";
import "../../styles/Instruction.css";

export default function InstructionsPage() {
  const { mocktestId } = useParams();
  const { instruction, symbolIcons } = useInstructionsPage(mocktestId);

  if (!instruction)
    return <div className="loading">Loading instructions...</div>;

  return (
    <div className="instructions-page">
      {/* HEADER */}
      <header className="inst-header fade-down">
        <h1>📘 Test Instructions</h1>
        <p>Read carefully before starting the test</p>
      </header>

      {/* CONTENT */}
      <main className="inst-content fade-in">
        {/* Title + Description */}
        <div className="inst-card">
          <h2 className="inst-title">{instruction.title}</h2>
          <p className="inst-description">{instruction.description}</p>
        </div>

        {/* SECTIONS TABLE */}
        {instruction.sections?.length > 0 && (
          <div className="inst-card">
            <h3 className="block-title">📂 Sections Overview</h3>
            <table className="inst-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Total Qs</th>
                  <th>Correct</th>
                  <th>Negative</th>
                  <th>Max Score</th>
                </tr>
              </thead>
              <tbody>
                {instruction.sections.map((sec) => (
                  <tr key={sec.id}>
                    <td>
                      <span className="badge">{sec.name}</span>
                    </td>
                    <td>{sec.totalQuestions}</td>
                    <td>+{sec.correctMarks}</td>
                    <td>-{sec.negativeMarks}</td>
                    <td>{sec.maxScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SYMBOLS */}
        {instruction.symbols?.length > 0 && (
          <div className="inst-card">
            <h3 className="block-title">🔎 Symbols Used...</h3>

            <div className="symbols-grid">
              {instruction.symbols.map((sym) => {
                const normalized = sym.label?.toLowerCase().trim();
                const iconSymbol =
                  symbolIcons[normalized] || symbolIcons.default;

                return (
                  <div key={sym.id} className="symbol-item">
                    <span className="symbol-icon">{iconSymbol}</span>
                    <div className="symbol-text">{sym.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CATEGORIES */}
        {instruction.categories?.length > 0 && (
          <div className="inst-card">
            <h3 className="block-title">📑 Instructions</h3>

            {instruction.categories.map((cat) => (
              <div key={cat.id} className="category-block">
                <h4>{cat.title}</h4>
                <ul>
                  {cat.points?.map((point) => (
                    <li key={point.id}>{point.text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="inst-footer fade-up">
        <button
          className="inst-start-btn"
          onClick={() =>
            (window.location.href = `/mocktest/${mocktestId}/start`)
          }
        >
          Start Test 🚀
        </button>
      </footer>
    </div>
  );
}
