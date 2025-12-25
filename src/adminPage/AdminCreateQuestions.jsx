import React, { useEffect, useState } from "react";
import "./AdminCreateQuestions.css";

export default function AdminCreateQuestions() {
    const [testSeries, setTestSeries] = useState([]);
    const [mockTests, setMockTests] = useState([]);
    const [testSeriesId, setTestSeriesId] = useState("");
    const [mockTestId, setMockTestId] = useState("");
    const [loading, setLoading] = useState(false);

    const emptyQuestion = {
        questionText: "",
        questionType: "MCQ",
        subject: "GK",
        options: [
            { optionKey: "A", optionText: "", isCorrect: false },
            { optionKey: "B", optionText: "", isCorrect: false },
            { optionKey: "C", optionText: "", isCorrect: false },
            { optionKey: "D", optionText: "", isCorrect: false }
        ]
    };

    const [questions, setQuestions] = useState([
        JSON.parse(JSON.stringify(emptyQuestion))
    ]);

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

    /* ================= HELPERS ================= */
    const updateQuestion = (i, field, value) => {
        const updated = [...questions];
        updated[i][field] = value;
        setQuestions(updated);
    };

    const updateOption = (qi, oi, value) => {
        const updated = [...questions];
        updated[qi].options[oi].optionText = value;
        setQuestions(updated);
    };

    const toggleCorrect = (qi, oi) => {
        const updated = [...questions];
        const q = updated[qi];

        if (q.questionType !== "MULTI_SELECT") {
            q.options.forEach(o => (o.isCorrect = false));
        }
        q.options[oi].isCorrect = !q.options[oi].isCorrect;
        setQuestions(updated);
    };

    const changeQuestionType = (qi, type) => {
        const updated = [...questions];
        updated[qi].questionType = type;

        updated[qi].options =
            type === "TRUE_FALSE"
                ? [
                    { optionKey: "A", optionText: "True", isCorrect: false },
                    { optionKey: "B", optionText: "False", isCorrect: false }
                ]
                : [
                    { optionKey: "A", optionText: "", isCorrect: false },
                    { optionKey: "B", optionText: "", isCorrect: false },
                    { optionKey: "C", optionText: "", isCorrect: false },
                    { optionKey: "D", optionText: "", isCorrect: false }
                ];

        setQuestions(updated);
    };

    const addQuestion = () =>
        setQuestions([...questions, JSON.parse(JSON.stringify(emptyQuestion))]);

    const removeQuestion = i => {
        if (questions.length === 1) return;
        setQuestions(questions.filter((_, idx) => idx !== i));
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
            if (!res.ok) throw new Error("Failed to save");
            alert("Questions saved successfully");
            setQuestions([JSON.parse(JSON.stringify(emptyQuestion))]);
        } catch (e) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= UI ================= */
    return (
        <div className="acq-container">
            <h2 className="acq-title">Create Questions</h2>

            <div className="acq-selectors">
                <select value={testSeriesId} onChange={e => setTestSeriesId(e.target.value)}>
                    <option value="">Select Test Series</option>
                    {testSeries.map(ts => (
                        <option key={ts.id} value={ts.id}>
                            {ts.title || ts.name}
                        </option>
                    ))}
                </select>

                <select value={mockTestId} onChange={e => setMockTestId(e.target.value)}>
                    <option value="">Select Mock Test</option>
                    {mockTests.map(mt => (
                        <option key={mt.id} value={mt.id}>
                            {mt.title}
                        </option>
                    ))}
                </select>
            </div>

            {questions.map((q, qi) => (
                <div className="acq-card" key={qi}>
                    <div className="acq-card-header">
                        <h4>Question {qi + 1}</h4>
                        <button onClick={() => removeQuestion(qi)}>✕</button>
                    </div>

                    <textarea
                        className="acq-textarea"
                        placeholder="Enter question"
                        value={q.questionText}
                        onChange={e => updateQuestion(qi, "questionText", e.target.value)}
                    />

                    <select
                        className="acq-question-type"
                        value={q.questionType}
                        onChange={e => changeQuestionType(qi, e.target.value)}
                    >
                        <option value="MCQ">MCQ (Single Correct)</option>
                        <option value="MULTI_SELECT">Multi Select</option>
                        <option value="TRUE_FALSE">True / False</option>
                    </select>

                    <div className="acq-options">
                        {q.options.map((opt, oi) => (
                            <label className="acq-option-row" key={oi}>
                                <input
                                    type={q.questionType === "MULTI_SELECT" ? "checkbox" : "radio"}
                                    name={`correct-${qi}`}
                                    checked={opt.isCorrect}
                                    onChange={() => toggleCorrect(qi, oi)}
                                />
                                <span className="acq-option-key">{opt.optionKey}</span>
                                {q.questionType !== "TRUE_FALSE" && (
                                    <input
                                        type="text"
                                        value={opt.optionText}
                                        placeholder="Option text"
                                        onChange={e => updateOption(qi, oi, e.target.value)}
                                    />
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <div className="acq-actions">
                <button className="acq-btn-outline" onClick={addQuestion}>
                    + Add Question
                </button>
                <button className="acq-btn-primary" onClick={submitQuestions} disabled={loading}>
                    {loading ? "Saving..." : "Save All Questions"}
                </button>
            </div>
        </div>
    );
}
