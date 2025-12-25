// src/pages/mocktest/StartTest.jsx
import React from "react";
import { useParams } from "react-router-dom";
import useStartTest from "../../hooks/mocktest/useStartTest";
import "../../styles/Attempt.css";

export default function StartTest() {
  const { mocktestId } = useParams();

  const {
    loading,
    questions,
    mocktests,
    subjects,
    currentSubjectIndex,
    currentQuestionIndex,
    currentQuestion,
    minutes,
    seconds,
    isFullscreen,
    isPaused,
    readyToSubmit,
    answers,
    visited,
    marked,

    // handlers
    handleFullScreen,
    togglePause,
    handleSelect,
    clearResponse,
    toggleMarkForReview,
    goPrevQuestion,
    goNextQuestion,
    goToQuestion,
    submitTest,
    getPaletteState,
    markVisited,
    user
  } = useStartTest(mocktestId);

  // ---------------- SAFE GUARDS (NO CRASH) ---------------- //

  if (loading) {
    return <div className="st-loading">Loading test...</div>;
  }

  // wait for questions
  if (!questions || questions.length === 0) {
    return <div className="st-loading">Preparing questions...</div>;
  }

  // wait for subject grouping
  if (!subjects || subjects.length === 0) {
    return <div className="st-loading">Preparing subjects...</div>;
  }

  const currentSubject = subjects[currentSubjectIndex];

  if (!currentSubject) {
    return <div className="st-loading">Loading subject...</div>;
  }

  if (!currentSubject.questions || currentSubject.questions.length === 0) {
    return <div className="st-loading">Loading subject questions...</div>;
  }

  if (!currentQuestion) {
    return <div className="st-loading">Loading question...</div>;
  }

  // ---------------- RENDER UI (SAFE) ---------------- //

  return (
    <div className="st-root">
      {/* HEADER */}
      <div className="st-header">
        <div className="st-left-title">{mocktests?.title || "Loading..."}</div>

        <div className="st-right-controls">
          <button className="st-fullscreen" onClick={handleFullScreen}>
            {isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
          </button>

          <div className="st-timer">Time Left: {minutes}:{seconds}</div>

          <div className="st-avatar" onClick={togglePause}>
            <div className="avatar-circle">
              <span className="avatar-icon">{isPaused ? "▶" : "⏸"}</span>
            </div>
            <div className="pause-text">{isPaused ? "Resume Test" : "Pause Test"}</div>
          </div>
        </div>
      </div>

      {/* SUBJECT TABS */}
      <div className="st-sections">
        {subjects.map((subj, idx) => (
          <div
            key={subj.subject}
            className={`section-pill ${idx === currentSubjectIndex ? "active" : ""}`}
            onClick={() => { goToQuestion(idx, 0); }}
          >
            {subj.subject}
          </div>
        ))}
      </div>

      {/* BODY */}
      <div className="st-body">
        {/* LEFT SIDE */}
        <div className="st-left">
          <div className="question-card">
            <div className="question-title">Question No {currentQuestionIndex + 1}</div>
            <hr />

            <div className="question-desc">
              <p>{currentQuestion.questionText}</p>
            </div>

            {/* OPTIONS */}
            <div className="options-container">
              {currentQuestion.options.map((opt) => {
                const qId = currentQuestion.id;
                const userAns = answers[qId];

                const checked =
                  currentQuestion.questionType === "MULTI_SELECT"
                    ? Array.isArray(userAns) && userAns.includes(opt.id)
                    : userAns === opt.id;

                return (
                  <label
                    key={opt.id}
                    className={`st-option ${checked ? "selected" : ""}`}
                    onClick={() => markVisited(currentQuestion.id)}
                  >
                    <input
                      type={currentQuestion.questionType === "MULTI_SELECT" ? "checkbox" : "radio"}
                      name={`q-${currentQuestion.id}`}
                      checked={checked}
                      onChange={() => handleSelect(currentQuestion, opt.id)}
                    />
                    <span className="opt-label">
                      <strong>{opt.optionKey}.</strong> {opt.optionText}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* BUTTONS */}
            <div className="st-bottom-controls">
              <div className="left-controls">
                <button
                  className="btn review"
                  onClick={() => {
                    toggleMarkForReview();
                    goNextQuestion(true);
                  }}
                >
                  Mark for Review & Next
                </button>

                <button className="btn clear" onClick={clearResponse}>
                  Clear Response
                </button>
              </div>

              <div className="right-controls">
                <button className="btn prev" onClick={goPrevQuestion}>
                  Previous
                </button>

                <button className="btn save" onClick={goNextQuestion}>
                  {readyToSubmit ? "Submit" : "Save & Next"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="st-right">
          <div className="candidate-card">
            <div className="candidate-left">

              <div className="candidate-photo">
                <img
                  src={
                    user?.profileImage
                      ? `http://localhost:8080${user.profileImage}`
                      : "/assets/default-user.png"
                  }
                  alt="Profile"
                />
              </div>

              <div className="candidate-info">
                <div className="info-row">
                  <span className="label">Candidate Name :</span>
                  <span className="value name">
                    {user?.fullName || "Loading..."}
                  </span>
                </div>

                <div className="info-row">
                  <span className="label">Candidate ID :</span>
                  <span className="value">
                    {user?.id || "--"}
                  </span>
                </div>
              </div>

            </div>
          </div>


          {/* LEGEND */}
          <div className="legend-box">
            <h4>Status Guide ⭐</h4>
            <div className="legend-items">
              <div className="legend-row"><span className="legend-chip answered">1</span> Answered</div>
              <div className="legend-row"><span className="legend-chip not-answered">3</span> Not Answered</div>
              <div className="legend-row"><span className="legend-chip marked">6</span> Marked</div>
              <div className="legend-row"><span className="legend-chip not-visited">8</span> Not Visited</div>
              <div className="legend-row"><span className="legend-chip answered-marked">9</span> Answered Marked</div>
            </div>
          </div>

          {/* PALETTE */}
          <div className="palette-box">
            <div className="palette-grid">
              {currentSubject.questions.map((q, qIdx) => {
                const isCurrent = qIdx === currentQuestionIndex;

                return (
                  <div
                    key={q.id}
                    className={`palette-item ${getPaletteState(q)} ${isCurrent ? "current" : ""}`}
                    onClick={() => goToQuestion(currentSubjectIndex, qIdx)}
                  >
                    {qIdx + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="right-actions">
            <button className="btn-submit" onClick={submitTest}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
