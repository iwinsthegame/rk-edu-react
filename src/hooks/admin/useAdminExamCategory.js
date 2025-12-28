import { useEffect, useState } from "react";
import {
    fetchExamCategories,
    createExamCategory
} from "../../services/admin/adminExamCategory/adminExamCategoryService";

export default function useAdminExamCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        description: "",
        logoUrl: ""
    });

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await fetchExamCategories();
            setCategories(data);
        } catch (err) {
            setError("Failed to load exam categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const update = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            await createExamCategory(form);
            setForm({ name: "", description: "", logoUrl: "" });
            loadCategories();
        } catch (err) {
            alert("Failed to create category");
        }
    };

    return {
        categories,
        loading,
        error,
        form,
        update,
        submit
    };
}
