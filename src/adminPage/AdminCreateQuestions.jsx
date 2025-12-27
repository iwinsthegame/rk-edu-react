import React, { useEffect, useState } from "react";
import "./AdminCreateQuestions.css";

export default function AdminCreateQuestions() {
    const [testSeries, setTestSeries] = useState([]);
    const [mockTests, setMockTests] = useState([]);
    const [testSeriesId, setTestSeriesId] = useState("");
    const [mockTestId, setMockTestId] = useState("");
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [dragIndex, setDragIndex] = useState(null);

    const emptyQuestion = {
        questionText: "",
        questionType: "MCQ",
        subject: "GK",
        marks: 1,
        options: [
            { optionKey: "A", optionText: "", isCorrect: false },
            { optionKey: "B", optionText: "", isCorrect: false },
            { optionKey: "C", optionText: "", isCorrect: false },
            { optionKey: "D", optionText: "", isCorrect: false }
        ]
    };

    const [questions, setQuestions] = useState([structuredClone(emptyQuestion)]);

    /* ================= FETCH ================= */
    useEffect(() => {
        fetch("http://localhost:8080/rk/user/testseries")
            .then(res => res.json())
            .then(setTestSeries);
    }, []);

    useEffect(() => {
        if (!testSeriesId) return;
        fetch(`http://localhost:8080/rk/user/mocktest/testseries/${testSeriesId}`)
            .then(res => res.json())
            .then(setMockTests);
    }, [testSeriesId]);

    // EDIT EXISTING QUESTIONS
    useEffect(() => {
        if (!mockTestId) return;

        fetch(`http://localhost:8080/rk/admin/mocktest/${mockTestId}/questions`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setQuestions(data);
                } else {
                    setQuestions([structuredClone(emptyQuestion)]);
                }
            });
    }, [mockTestId]);

    /* ================= HELPERS ================= */
    const updateQuestion = (i, field, value) => {
        const q = [...questions];
        q[i][field] = value;
        setQuestions(q);
    };

    const updateOption = (qi, oi, value) => {
        const q = [...questions];
        q[qi].options[oi].optionText = value;
        setQuestions(q);
    };

    const toggleCorrect = (qi, oi) => {
        const q = [...questions];
        if (q[qi].questionType !== "MULTI_SELECT") {
            q[qi].options.forEach(o => (o.isCorrect = false));
        }
        q[qi].options[oi].isCorrect = !q[qi].options[oi].isCorrect;
        setQuestions(q);
    };

    const changeQuestionType = (qi, type) => {
        const q = [...questions];
        q[qi].questionType = type;
        q[qi].options =
            type === "TRUE_FALSE"
                ? [
                    { optionKey: "A", optionText: "True", isCorrect: false },
                    { optionKey: "B", optionText: "False", isCorrect: false }
                ]
                : structuredClone(emptyQuestion.options);
        setQuestions(q);
    };

    /* ================= DRAG REORDER ================= */
    const onDragStart = index => setDragIndex(index);

    const onDrop = index => {
        if (dragIndex === null) return;
        const q = [...questions];
        const item = q.splice(dragIndex, 1)[0];
        q.splice(index, 0, item);
        setQuestions(q);
        setDragIndex(null);
    };

    /* ================= SUBMIT ================= */
    const submitQuestions = async () => {
        if (!mockTestId) return alert("Select Mock Test");

        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8080/rk/admin/mocktest/${mockTestId}/questions/bulk`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(questions)
                }
            );
            if (!res.ok) throw new Error("Save failed");
            alert("Questions saved successfully");
        } catch (e) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= UI ================= */
    return (
        <div className="acq-container">
            <h2 className="acq-title">Create / Edit Questions</h2>

            <div className="acq-selectors">
                <select value={testSeriesId} onChange={e => setTestSeriesId(e.target.value)}>
                    <option value="">Select Test Series</option>
                    {testSeries.map(ts => (
                        <option key={ts.id} value={ts.id}>{ts.title || ts.name}</option>
                    ))}
                </select>

                <select value={mockTestId} onChange={e => setMockTestId(e.target.value)}>
                    <option value="">Select Mock Test</option>
                    {mockTests.map(mt => (
                        <option key={mt.id} value={mt.id}>{mt.title}</option>
                    ))}
                </select>
            </div>

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
                        value={q.questionText}
                        onChange={e => updateQuestion(qi, "questionText", e.target.value)}
                        placeholder="Enter question"
                    />

                    <div className="acq-row">
                        <select value={q.questionType} onChange={e => changeQuestionType(qi, e.target.value)}>
                            <option value="MCQ">MCQ</option>
                            <option value="MULTI_SELECT">Multi Select</option>
                            <option value="TRUE_FALSE">True / False</option>
                        </select>

                        <input
                            type="number"
                            min="1"
                            value={q.marks}
                            onChange={e => updateQuestion(qi, "marks", e.target.value)}
                            placeholder="Marks"
                        />
                    </div>

                    <div className="acq-options">
                        {q.options.map((opt, oi) => (
                            <label key={oi}>
                                <input
                                    type={q.questionType === "MULTI_SELECT" ? "checkbox" : "radio"}
                                    checked={opt.isCorrect}
                                    onChange={() => toggleCorrect(qi, oi)}
                                />
                                <span>{opt.optionKey}</span>
                                {q.questionType !== "TRUE_FALSE" && (
                                    <input
                                        type="text"
                                        value={opt.optionText}
                                        onChange={e => updateOption(qi, oi, e.target.value)}
                                    />
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <div className="acq-actions">
                <button onClick={() => setQuestions([...questions, structuredClone(emptyQuestion)])}>
                    + Add Question
                </button>
                <button onClick={() => setPreviewOpen(true)}>Preview Exam</button>
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
                                <p><b>Q{i + 1}.</b> {q.questionText} <span>({q.marks} Marks)</span></p>
                                {q.options.map(o => (
                                    <div key={o.optionKey} className="acq-preview-opt">
                                        <input type={q.questionType === "MULTI_SELECT" ? "checkbox" : "radio"} disabled />
                                        <span>{o.optionKey}. {o.optionText}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button onClick={() => setPreviewOpen(false)}>Close Preview</button>
                    </div>
                </div>
            )}
        </div>
    );
}
