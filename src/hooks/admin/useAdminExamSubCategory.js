import { useEffect, useState } from "react";
import {
    fetchExamCategories,
    fetchExamSubCategories,
    createExamSubCategory
} from "../../services/admin/adminExamSubCategory/adminExamSubCategoryService";

export default function useAdminExamSubCategory() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [form, setForm] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const data = await fetchExamCategories();
        setCategories(data);
    };

    const selectCategory = async (id) => {
        setSelectedCategory(id);
        if (!id) {
            setSubCategories([]);
            return;
        }
        const data = await fetchExamSubCategories(id);
        setSubCategories(data);
    };

    const update = (key, value) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const submit = async (e) => {
        e.preventDefault();
        if (!selectedCategory) return alert("Select category first");

        await createExamSubCategory(selectedCategory, form);
        setForm({ name: "", description: "" });

        const data = await fetchExamSubCategories(selectedCategory);
        setSubCategories(data);
    };

    return {
        categories,
        subCategories,
        selectedCategory,
        form,
        update,
        selectCategory,
        submit
    };
}
