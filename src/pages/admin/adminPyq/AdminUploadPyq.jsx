import React from "react";
import "../../../styles/admin/adminPyq/AdminUploadPyq.css";
import useAdminPyq from "../../../hooks/admin/useAdminPyq";

export default function AdminUploadPyq() {
    const {
        categories,
        subCategories,
        file,
        setFile,
        loading,
        form,
        update,
        submit
    } = useAdminPyq();

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
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={form.examSubCategoryId}
                        onChange={e =>
                            update("examSubCategoryId", e.target.value)
                        }
                    >
                        <option value="">Select Sub Category</option>
                        {subCategories.map(sc => (
                            <option key={sc.id} value={sc.id}>
                                {sc.name}
                            </option>
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
