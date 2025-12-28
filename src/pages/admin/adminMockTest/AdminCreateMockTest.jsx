// src/pages/admin/AdminCreateMockTest.jsx
import React from "react";
import "../../../styles/admin/adminMockTest/AdminCreateMockTest.css";
import useAdminMockTest from "../../../hooks/admin/useAdminMockTest";


export default function AdminCreateMockTest() {
    const {
        testSeriesList,
        testSeriesId,
        setTestSeriesId,
        form,
        update,
        submit,
        loading,
    } = useAdminMockTest();

    return (
        <div className="admin-mock-container">
            <h2>🧪 Create Mock Testssss</h2>

            <div className="mock-card">
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
