import React, { useEffect, useState } from "react";
import "./ExamSubCategoryPage.css";

const CATEGORY_API = "http://localhost:8080/rk/user/exam-category";
const SUBCATEGORY_API = "http://localhost:8080/rk/user/exam-subcategory";

export default function ExamSubCategoryPage() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [form, setForm] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch(CATEGORY_API);
        const data = await res.json();
        setCategories(data);
    };

    const fetchSubCategories = async (categoryId) => {
        const res = await fetch(`${SUBCATEGORY_API}/${categoryId}`);
        const data = await res.json();
        setSubCategories(data);
    };

    const handleCategoryChange = (e) => {
        const id = e.target.value;
        setSelectedCategory(id);
        if (id) fetchSubCategories(id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategory) return alert("Select category first");

        await fetch(`${SUBCATEGORY_API}/${selectedCategory}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        setForm({ name: "", description: "" });
        fetchSubCategories(selectedCategory);
    };

    return (
        <div className="subcategory-page">
            <h1>Exam Subcategories</h1>
            <p className="subtitle">Create & manage subcategories</p>

            {/* Category Select */}
            <select
                className="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="">-- Select Exam Category --</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            {/* Create Form */}
            {selectedCategory && (
                <form className="subcategory-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Subcategory Name (e.g. ONGC)"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        required
                    />

                    <textarea
                        placeholder="Subcategory Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        required
                    />

                    <button type="submit">➕ Add Subcategory</button>
                </form>
            )}

            {/* List */}
            <div className="subcategory-grid">
                {subCategories.map((sub) => (
                    <div key={sub.id} className="subcategory-card">
                        <h3>{sub.name}</h3>
                        <p>{sub.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
