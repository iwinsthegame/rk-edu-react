import React from "react";
import "../../../styles/admin/adminQuestions/adminCreateQuestion.css";
import useAdminQuestions from "../../../hooks/admin/useAdminQuestions";


export default function AdminCreateQuestions() {
    const {
        testSeries,
        mockTests,
        testSeriesId,
        setTestSeriesId,
        mockTestId,
        setMockTestId,
        questions,
        setQuestions,
        loading,
        previewOpen,
        setPreviewOpen,
        updateQuestion,
        updateOption,
        toggleCorrect,
        changeQuestionType,
        onDragStart,
        onDrop,
        submitQuestions,
        emptyQuestionTemplate,
    } = useAdminQuestions();

    return (
        <div className="acq-container">
            <h2 className="acq-title">Create / Edit Questions</h2>

            {/* ================= SELECTORS ================= */}
            <div className="acq-selectors">
                <select
                    value={testSeriesId}
                    onChange={e => setTestSeriesId(e.target.value)}
                >
                    <option value="">Select Test Series</option>
                    {testSeries.map(ts => (
                        <option key={ts.id} value={ts.id}>
                            {ts.title || ts.name}
                        </option>
                    ))}
                </select>

                <select
                    value={mockTestId}
                    onChange={e => setMockTestId(e.target.value)}
                >
                    <option value="">Select Mock Test</option>
                    {mockTests.map(mt => (
                        <option key={mt.id} value={mt.id}>
                            {mt.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* ================= QUESTIONS ================= */}
            {questions.map((q, qi) => (
                <div
                    key={qi}
                    className="acq-card"
                    draggable
                    onDragStart={() => onDragStart(qi)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => onDrop(qi)}
                >
                    <div className="acq-card-header">
                        <h4>Q{qi + 1}</h4>
                        <span className="acq-drag">☰ Drag</span>
                    </div>

                    <textarea
                        placeholder="Enter question"
                        value={q.questionText}
                        onChange={e =>
                            updateQuestion(qi, "questionText", e.target.value)
                        }
                    />

                    <div className="acq-row">
                        <select
                            value={q.questionType}
                            onChange={e =>
                                changeQuestionType(qi, e.target.value)
                            }
                        >
                            <option value="MCQ">MCQ</option>
                            <option value="MULTI_SELECT">Multi Select</option>
                            <option value="TRUE_FALSE">True / False</option>
                        </select>

                        <input
                            type="number"
                            min="1"
                            placeholder="Marks"
                            value={q.marks}
                            onChange={e =>
                                updateQuestion(qi, "marks", e.target.value)
                            }
                        />
                    </div>

                    <div className="acq-options">
                        {q.options.map((opt, oi) => (
                            <label key={oi}>
                                <input
                                    type={
                                        q.questionType === "MULTI_SELECT"
                                            ? "checkbox"
                                            : "radio"
                                    }
                                    checked={opt.isCorrect}
                                    onChange={() => toggleCorrect(qi, oi)}
                                />
                                <span>{opt.optionKey}</span>

                                {q.questionType !== "TRUE_FALSE" && (
                                    <input
                                        type="text"
                                        value={opt.optionText}
                                        onChange={e =>
                                            updateOption(qi, oi, e.target.value)
                                        }
                                    />
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            {/* ================= ACTIONS ================= */}
            <div className="acq-actions">
                <button
                    onClick={() =>
                        setQuestions([
                            ...questions,
                            structuredClone(emptyQuestionTemplate),
                        ])
                    }
                >
                    + Add Question
                </button>

                <button onClick={() => setPreviewOpen(true)}>
                    Preview Exam
                </button>

                <button onClick={submitQuestions} disabled={loading}>
                    {loading ? "Saving..." : "Save All"}
                </button>
            </div>

            {/* ================= PREVIEW ================= */}
            {previewOpen && (
                <div className="acq-preview-overlay">
                    <div className="acq-preview">
                        <h3>Exam Preview</h3>

                        {questions.map((q, i) => (
                            <div key={i} className="acq-preview-q">
                                <p>
                                    <b>Q{i + 1}.</b> {q.questionText}
                                    <span> ({q.marks} Marks)</span>
                                </p>

                                {q.options.map(o => (
                                    <div
                                        key={o.optionKey}
                                        className="acq-preview-opt"
                                    >
                                        <input
                                            type={
                                                q.questionType === "MULTI_SELECT"
                                                    ? "checkbox"
                                                    : "radio"
                                            }
                                            disabled
                                        />
                                        <span>
                                            {o.optionKey}. {o.optionText}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <button onClick={() => setPreviewOpen(false)}>
                            Close Preview
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
