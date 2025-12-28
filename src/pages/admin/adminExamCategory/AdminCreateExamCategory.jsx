import React from "react";
import "../../../styles/admin/adminExamCategory/adminCreateExamCategory.css";
import useAdminExamCategory from "../../../hooks/admin/useAdminExamCategory";

export default function AdminExamCategoryPage() {
    const {
        categories,
        loading,
        error,
        form,
        update,
        submit
    } = useAdminExamCategory();

    return (
        <div className="admin-exam-page">
            <h1>Exam Categories</h1>
            <p className="admin-exam-subtitle">
                Manage all entrance exam categories offered on the platform.
            </p>

            {/* Create Form */}
            <form className="admin-exam-form" onSubmit={submit}>
                <input
                    type="text"
                    placeholder="Exam Name (e.g. CAT)"
                    value={form.name}
                    onChange={e => update("name", e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Logo URL (/uploads/logos/cat.png)"
                    value={form.logoUrl}
                    onChange={e => update("logoUrl", e.target.value)}
                />

                <textarea
                    placeholder="Exam Description"
                    value={form.description}
                    onChange={e => update("description", e.target.value)}
                    required
                />

                <button type="submit">➕ Add Category</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="admin-exam-error">{error}</p>}

            <div className="admin-exam-grid">
                {categories.map(cat => (
                    <div key={cat.id} className="admin-exam-card">
                        <img
                            src={cat.logoUrl}
                            alt={cat.name}
                            onError={e =>
                            (e.target.src =
                                "https://via.placeholder.com/80")
                            }
                        />
                        <h3>{cat.name}</h3>
                        <p>{cat.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
