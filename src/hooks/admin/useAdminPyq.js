import { useEffect, useState } from "react";
import {
    fetchExamCategories,
    fetchExamSubCategories,
    uploadPyq
} from "../../services/admin/adminPyq/adminPyqService";

export default function useAdminPyq() {
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
        fetchExamCategories()
            .then(setCategories)
            .catch(console.error);
    }, []);

    /* ================= FETCH SUB CATEGORIES ================= */
    useEffect(() => {
        if (!form.examCategoryId) return;

        fetchExamSubCategories(form.examCategoryId)
            .then(setSubCategories)
            .catch(console.error);
    }, [form.examCategoryId]);

    /* ================= HANDLERS ================= */
    const update = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const submit = async () => {
        if (!file) {
            alert("Please select PDF file");
            return;
        }

        setLoading(true);
        try {
            await uploadPyq(form, file);

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
            alert(e.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        subCategories,
        file,
        setFile,
        loading,
        form,
        update,
        submit
    };
}
