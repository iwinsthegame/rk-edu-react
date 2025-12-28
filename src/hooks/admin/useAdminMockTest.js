// src/hooks/admin/useAdminMockTest.js
import { useEffect, useState } from "react";
import {
    getTestSeriesList,
    createMockTest,
} from "../../services/admin/adminMockTest/adminMockTestService";

export default function useAdminMockTest() {
    const [testSeriesList, setTestSeriesList] = useState([]);
    const [testSeriesId, setTestSeriesId] = useState("");

    const [form, setForm] = useState({
        title: "",
        durationMinutes: "",
        totalQuestions: "",
        totalMarks: "",
        isActive: true,
    });

    const [loading, setLoading] = useState(false);

    /* LOAD TEST SERIES */
    useEffect(() => {
        getTestSeriesList()
            .then(setTestSeriesList)
            .catch(() => alert("Failed to load test series"));
    }, []);

    /* FORM UPDATE */
    const update = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    /* SUBMIT */
    const submit = async () => {
        if (!testSeriesId) {
            alert("Please select a Test Series");
            return;
        }

        if (
            !form.title ||
            !form.durationMinutes ||
            !form.totalQuestions ||
            !form.totalMarks
        ) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);
        try {
            await createMockTest(testSeriesId, form);
            alert("✅ Mock Test Created Successfully");

            setForm({
                title: "",
                durationMinutes: "",
                totalQuestions: "",
                totalMarks: "",
                isActive: true,
            });
        } catch (err) {
            alert("Failed to create mock test");
        } finally {
            setLoading(false);
        }
    };

    return {
        testSeriesList,
        testSeriesId,
        setTestSeriesId,
        form,
        update,
        submit,
        loading,
    };
}
