import React, { useEffect, useState } from "react";
import "./AdminUploadPyq.css";

export default function AdminUploadPyq() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        year: "",
        examName: "",
        examStage: "",
        examCategoryId: "",
        examSubCategoryId: ""
    });

    /* ================= FETCH CATEGORIES ================= */
    useEffect(() => {
        fetch("http://localhost:8080/rk/user/exam-category")
            .then(res => res.json())
            .then(setCategories)
            .catch(console.error);
    }, []);

    /* ================= FETCH SUB CATEGORIES ================= */
    useEffect(() => {
        if (!form.examCategoryId) return;

        fetch(`http://localhost:8080/rk/user/exam-subcategory/category/${form.examCategoryId}`)
            .then(res => res.json())
            .then(setSubCategories)
            .catch(console.error);
    }, [form.examCategoryId]);

    /* ================= HANDLERS ================= */
    const update = (key, value) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const submit = async () => {
        if (!file) return alert("Please select PDF file");

        const payload = new FormData();
        payload.append("file", file);
        payload.append("data", JSON.stringify(form));

        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/rk/user/pyq/upload", {
                method: "POST",
                body: payload
            });

            if (!res.ok) throw new Error("Upload failed");

            alert("PYQ uploaded successfully");
            setForm({
                title: "",
                year: "",
                examName: "",
                examStage: "",
                examCategoryId: "",
                examSubCategoryId: ""
            });
            setFile(null);
        } catch (e) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= UI ================= */
    return (
        <div className="apyq-container">
            <h2 className="apyq-title">Upload PYQ Paper</h2>

            <div className="apyq-card">
                <div className="apyq-grid">
                    <input
                        placeholder="Paper Title"
                        value={form.title}
                        onChange={e => update("title", e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Year (e.g. 2018)"
                        value={form.year}
                        onChange={e => update("year", e.target.value)}
                    />

                    <input
                        placeholder="Exam Name (SSC CGL)"
                        value={form.examName}
                        onChange={e => update("examName", e.target.value)}
                    />

                    <select
                        value={form.examStage}
                        onChange={e => update("examStage", e.target.value)}
                    >
                        <option value="">Select Exam Stage</option>
                        <option value="PRE">Pre</option>
                        <option value="MAINS">Mains</option>
                        <option value="TIER_1">Tier 1</option>
                        <option value="TIER_2">Tier 2</option>
                    </select>

                    <select
                        value={form.examCategoryId}
                        onChange={e => update("examCategoryId", e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        value={form.examSubCategoryId}
                        onChange={e => update("examSubCategoryId", e.target.value)}
                    >
                        <option value="">Select Sub Category</option>
                        {subCategories.map(sc => (
                            <option key={sc.id} value={sc.id}>{sc.name}</option>
                        ))}
                    </select>
                </div>

                <div className="apyq-upload-box">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <p>{file ? file.name : "Upload PDF file only"}</p>
                </div>

                <button
                    className="apyq-btn"
                    onClick={submit}
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload PYQ"}
                </button>
            </div>
        </div>
    );
}
