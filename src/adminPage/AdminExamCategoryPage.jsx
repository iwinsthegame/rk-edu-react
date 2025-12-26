import React, { useEffect, useState } from "react";
import "./AdminExamCategoryPage.css";

const API_URL = "http://localhost:8080/rk/user/exam-category";

export default function AdminExamCategoryPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        description: "",
        logoUrl: ""
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            setError("Failed to load exam categories");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            setForm({ name: "", description: "", logoUrl: "" });
            fetchCategories();
        } catch (err) {
            alert("Failed to create category");
        }
    };

    return (
        <div className="admin-exam-page">
            <h1>Exam Categories</h1>
            <p className="admin-exam-subtitle">
                Manage all entrance exam categories
            </p>

            {/* Create Form */}
            <form className="admin-exam-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Exam Name (e.g. CAT)"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                    required
                />
                <input
                    type="text"
                    placeholder="Logo URL (/uploads/logos/cat.png)"
                    value={form.logoUrl}
                    onChange={(e) =>
                        setForm({ ...form, logoUrl: e.target.value })
                    }
                />
                <textarea
                    placeholder="Exam Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                    required
                />
                <button type="submit">➕ Add Category</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="admin-exam-error">{error}</p>}

            <div className="admin-exam-grid">
                {categories.map((cat) => (
                    <div key={cat.id} className="admin-exam-card">
                        <img
                            src={cat.logoUrl}
                            alt={cat.name}
                            onError={(e) =>
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
