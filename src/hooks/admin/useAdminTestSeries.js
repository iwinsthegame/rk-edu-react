// src/hooks/admin/useAdminTestSeries.js
import { useEffect, useState } from "react";
import {
    getExamCategories,
    getPreviousTestSeries,
    saveTestSeries,
} from "../../services/admin/adminTestSeries/adminTestSeriesService";

const ADMIN_ID = 5;

export default function useAdminTestSeries() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [previousSeries, setPreviousSeries] = useState([]);

    const [categoryId, setCategoryId] = useState("");
    const [examSubCategoryId, setExamSubCategoryId] = useState("");
    const [title, setTitle] = useState("");

    const [mockTests, setMockTests] = useState([]);
    const [status, setStatus] = useState("DRAFT");
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false);

    /* LOADERS */
    useEffect(() => {
        getExamCategories().then(setCategories);
        getPreviousTestSeries()
            .then(setPreviousSeries)
            .catch(() => setPreviousSeries([]));
    }, []);

    /* HANDLERS */
    const onCategoryChange = (id) => {
        setCategoryId(id);
        const selected = categories.find((c) => c.id === Number(id));
        setSubCategories(selected ? selected.subCategories : []);
        setExamSubCategoryId("");
    };

    const addMock = () => {
        setMockTests([
            ...mockTests,
            {
                title: "",
                durationMinutes: "",
                totalQuestions: "",
                totalMarks: "",
                isActive: true,
                discussionEnabled: true,
                questionDiscussionEnabled: false,
            },
        ]);
    };

    const updateMock = (i, field, value) => {
        const copy = [...mockTests];
        copy[i][field] = value;
        setMockTests(copy);
    };

    const removeMock = (i) => {
        setMockTests(mockTests.filter((_, index) => index !== i));
    };

    const moveMock = (index, dir) => {
        const copy = [...mockTests];
        const target = index + dir;
        if (target < 0 || target >= copy.length) return;
        [copy[index], copy[target]] = [copy[target], copy[index]];
        setMockTests(copy);
    };

    const copyFromSeries = (id) => {
        const selected = previousSeries.find((p) => p.id === Number(id));
        if (selected?.mockTests) setMockTests(selected.mockTests);
    };

    const submit = async () => {
        if (!title || !examSubCategoryId || mockTests.length === 0) {
            alert("Fill all required fields");
            return;
        }

        setLoading(true);
        try {
            await saveTestSeries(ADMIN_ID, {
                title,
                examSubCategoryId: Number(examSubCategoryId),
                status,
                mockTests,
            });

            alert("✅ Test Series Saved");
            setMockTests([]);
            setTitle("");
            setPreview(false);
        } catch (err) {
            alert("Failed to save test series");
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        subCategories,
        previousSeries,
        categoryId,
        examSubCategoryId,
        title,
        mockTests,
        status,
        preview,
        loading,
        setTitle,
        setExamSubCategoryId,
        setStatus,
        setPreview,
        onCategoryChange,
        addMock,
        updateMock,
        removeMock,
        moveMock,
        copyFromSeries,
        submit,
    };
}
