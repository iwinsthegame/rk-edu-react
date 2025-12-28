import React from "react";
import "../../../styles/admin/adminExamSubCategory/adminExamSubCategory.css";
import useAdminExamSubCategory from "../../../hooks/admin/useAdminExamSubCategory";

export default function ExamSubCategoryPage() {
    const {
        categories,
        subCategories,
        selectedCategory,
        form,
        update,
        selectCategory,
        submit
    } = useAdminExamSubCategory();

    return (
        <div className="subcategory-page">
            <h1>Exam Subcategories</h1>
            <p className="subtitle">Create & manage subcategories</p>

            {/* Category Select */}
            <select
                className="category-select"
                value={selectedCategory}
                onChange={e => selectCategory(e.target.value)}
            >
                <option value="">-- Select Exam Category --</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            {/* Create Form */}
            {selectedCategory && (
                <form className="subcategory-form" onSubmit={submit}>
                    <input
                        type="text"
                        placeholder="Subcategory Name (e.g. ONGC)"
                        value={form.name}
                        onChange={e => update("name", e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Subcategory Description"
                        value={form.description}
                        onChange={e => update("description", e.target.value)}
                        required
                    />

                    <button type="submit">➕ Add Subcategory</button>
                </form>
            )}

            {/* List */}
            <div className="subcategory-grid">
                {subCategories.map(sub => (
                    <div key={sub.id} className="subcategory-card">
                        <h3>{sub.name}</h3>
                        <p>{sub.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
