import React, { useEffect, useState } from "react";
import "./AdminMockTest.css";

const ADMIN_ID = 5;

export default function AdminCreateMockTest() {
    const [testSeriesList, setTestSeriesList] = useState([]);
    const [testSeriesId, setTestSeriesId] = useState("");

    const [form, setForm] = useState({
        title: "",
        durationMinutes: "",
        totalQuestions: "",
        totalMarks: "",
        isActive: true
    });

    const [loading, setLoading] = useState(false);

    /* ================= FETCH TEST SERIES ================= */

    useEffect(() => {
        fetch(`http://localhost:8080/rk/user/testseries`)
            .then(res => res.json())
            .then(setTestSeriesList)
            .catch(() => alert("Failed to load test series"));
    }, []);

    /* ================= FORM HANDLERS ================= */

    const update = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    /* ================= SUBMIT ================= */

    const submit = () => {
        if (!testSeriesId) {
            alert("Please select a Test Series");
            return;
        }

        if (!form.title || !form.durationMinutes || !form.totalQuestions || !form.totalMarks) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);

        fetch(
            `http://localhost:8080/rk/admin/testseries/${testSeriesId}/mocktests`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: form.title,
                    durationMinutes: Number(form.durationMinutes),
                    totalQuestions: Number(form.totalQuestions),
                    totalMarks: Number(form.totalMarks),
                    isActive: form.isActive
                })
            }
        )
            .then(res => {
                if (!res.ok) throw new Error("Failed to create mock test");
                alert("✅ Mock Test Created Successfully");
                setForm({
                    title: "",
                    durationMinutes: "",
                    totalQuestions: "",
                    totalMarks: "",
                    isActive: true
                });
            })
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    };

    /* ================= UI ================= */

    return (
        <div className="admin-mock-container">
            <h2>🧪 Create Mock Test</h2>

            <div className="mock-card">
                {/* -------- TEST SERIES DROPDOWN -------- */}
                <select
                    value={testSeriesId}
                    onChange={e => setTestSeriesId(e.target.value)}
                >
                    <option value="">Select Test Series</option>
                    {testSeriesList.map(ts => (
                        <option key={ts.id} value={ts.id}>
                            {ts.title}
                        </option>
                    ))}
                </select>

                <input
                    className="mock-card-input"
                    placeholder="Mock Test Title"
                    value={form.title}
                    onChange={e => update("title", e.target.value)}
                />

                <input
                    className="mock-card-input"
                    type="number"
                    placeholder="Duration (minutes)"
                    value={form.durationMinutes}
                    onChange={e => update("durationMinutes", e.target.value)}
                />

                <input
                    className="mock-card-input"
                    type="number"
                    placeholder="Total Questions"
                    value={form.totalQuestions}
                    onChange={e => update("totalQuestions", e.target.value)}
                />

                <input
                    className="mock-card-input"
                    type="number"
                    placeholder="Total Marks"
                    value={form.totalMarks}
                    onChange={e => update("totalMarks", e.target.value)}
                />

                <label className="toggle">
                    <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={e => update("isActive", e.target.checked)}
                    />
                    Active
                </label>

                <button className="mock-bt" onClick={submit} disabled={loading}>
                    {loading ? "Creating..." : "Create Mock Test"}
                </button>
            </div>
        </div>
    );
}
