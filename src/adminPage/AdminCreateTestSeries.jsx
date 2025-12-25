import React, { useEffect, useState } from "react";
import "./AdminTestSeries.css";

const ADMIN_ID = 5;

export default function AdminCreateTestSeries() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [previousSeries, setPreviousSeries] = useState([]);

    const [categoryId, setCategoryId] = useState("");
    const [examSubCategoryId, setExamSubCategoryId] = useState("");
    const [title, setTitle] = useState("");

    const [mockTests, setMockTests] = useState([]);
    const [status, setStatus] = useState("DRAFT");
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/rk/user/exam-category")
            .then(res => res.json())
            .then(setCategories);
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/rk/user/testseries")
            .then(res => res.json())
            .then(setPreviousSeries)
            .catch(() => setPreviousSeries([]));
    }, []);

    const onCategoryChange = (id) => {
        setCategoryId(id);
        const selected = categories.find(c => c.id === Number(id));
        setSubCategories(selected ? selected.subCategories : []);
        setExamSubCategoryId("");
    };

    const addMock = () => {
        setMockTests([...mockTests, {
            title: "",
            durationMinutes: "",
            totalQuestions: "",
            totalMarks: "",
            isActive: true,
            discussionEnabled: true,
            questionDiscussionEnabled: false
        }]);
    };

    const updateMock = (i, field, value) => {
        const copy = [...mockTests];
        copy[i][field] = value;
        setMockTests(copy);
    };

    const removeMock = (i) => {
        setMockTests(mockTests.filter((_, index) => index !== i));
    };

    const moveMock = (index, dir) => {
        const copy = [...mockTests];
        const target = index + dir;
        if (target < 0 || target >= copy.length) return;
        [copy[index], copy[target]] = [copy[target], copy[index]];
        setMockTests(copy);
    };

    const copyFromSeries = (id) => {
        const selected = previousSeries.find(p => p.id === Number(id));
        if (selected?.mockTests) setMockTests(selected.mockTests);
    };

    const submit = () => {
        if (!title || !examSubCategoryId || mockTests.length === 0) {
            alert("Fill all required fields");
            return;
        }

        setLoading(true);
        fetch(`http://localhost:8080/rk/admin/testseries?adminId=${ADMIN_ID}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                examSubCategoryId: Number(examSubCategoryId),
                status,
                mockTests
            })
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed");
                alert("✅ Test Series Saved");
                setMockTests([]);
                setTitle("");
                setPreview(false);
            })
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    };

    if (preview) {
        return (
            <div className="admin-testseries-container">
                <h2>👁 Preview</h2>
                {mockTests.map((m, i) => (
                    <div key={i} className="ats-preview-mock">
                        <h4>{i + 1}. {m.title}</h4>
                        <p>{m.durationMinutes} min | {m.totalQuestions} Q | {m.totalMarks} Marks</p>
                    </div>
                ))}
                <button className="ats-btn" onClick={() => setPreview(false)}>⬅ Back</button>
            </div>
        );
    }

    return (
        <div className="admin-testseries-container">
            <h2>🚀 Create Test Series</h2>

            <div className="ats-card">
                <input className="ats-input" placeholder="Test Series Title"
                    value={title} onChange={e => setTitle(e.target.value)} />

                <select className="ats-select" value={categoryId}
                    onChange={e => onCategoryChange(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <select className="ats-select" value={examSubCategoryId}
                    onChange={e => setExamSubCategoryId(e.target.value)}>
                    <option value="">Select Sub Category</option>
                    {subCategories.map(sc => (
                        <option key={sc.id} value={sc.id}>{sc.name}</option>
                    ))}
                </select>

                <button
                    className={`ats-btn ats-btn-status ${status === "PUBLISHED" ? "published" : "draft"}`}
                    onClick={() => setStatus(status === "DRAFT" ? "PUBLISHED" : "DRAFT")}
                >
                    {status}
                </button>
            </div>

            <div className="ats-card">
                <h4>📋 Copy From Previous</h4>
                <select className="ats-select" onChange={e => copyFromSeries(e.target.value)}>
                    <option value="">Select Test Series</option>
                    {previousSeries.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                </select>
            </div>

            <h3>Mock Tests</h3>

            {mockTests.map((m, i) => (
                <div key={i} className="ats-mock-card">
                    <input className="ats-input" placeholder="Mock Title"
                        value={m.title} onChange={e => updateMock(i, "title", e.target.value)} />

                    <input className="ats-input" type="number" placeholder="Duration"
                        value={m.durationMinutes}
                        onChange={e => updateMock(i, "durationMinutes", e.target.value)} />

                    <input className="ats-input" type="number" placeholder="Questions"
                        value={m.totalQuestions}
                        onChange={e => updateMock(i, "totalQuestions", e.target.value)} />

                    <input className="ats-input" type="number" placeholder="Marks"
                        value={m.totalMarks}
                        onChange={e => updateMock(i, "totalMarks", e.target.value)} />

                    <div className="ats-row">
                        <button className="ats-btn ats-btn-move" onClick={() => moveMock(i, -1)}>⬆</button>
                        <button className="ats-btn ats-btn-move" onClick={() => moveMock(i, 1)}>⬇</button>
                        <button className="ats-btn ats-btn-danger" onClick={() => removeMock(i)}>❌</button>
                    </div>
                </div>
            ))}

            <button className="ats-btn" onClick={addMock}>+ Add Mock</button>

            <div className="ats-actions">
                <button className="ats-btn ats-btn-preview" onClick={() => setPreview(true)}>👁 Preview</button>
                <button className="ats-btn ats-btn-save" onClick={submit} disabled={loading}>
                    {loading ? "Saving..." : "Save Test Series"}
                </button>
            </div>
        </div>
    );
}
