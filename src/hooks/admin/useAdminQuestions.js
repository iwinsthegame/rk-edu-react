import { useEffect, useState } from "react";
import {
    getTestSeries,
    getMockTestsBySeries,
    getQuestionsByMockTest,
    saveQuestionsBulk,
} from "../../services/admin/adminQuestions/adminQuestionService";

const emptyQuestionTemplate = {
    questionText: "",
    questionType: "MCQ",
    subject: "GK",
    marks: 1,
    options: [
        { optionKey: "A", optionText: "", isCorrect: false },
        { optionKey: "B", optionText: "", isCorrect: false },
        { optionKey: "C", optionText: "", isCorrect: false },
        { optionKey: "D", optionText: "", isCorrect: false },
    ],
};

export default function useAdminQuestions() {
    const [testSeries, setTestSeries] = useState([]);
    const [mockTests, setMockTests] = useState([]);
    const [testSeriesId, setTestSeriesId] = useState("");
    const [mockTestId, setMockTestId] = useState("");
    const [questions, setQuestions] = useState([
        structuredClone(emptyQuestionTemplate),
    ]);
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [dragIndex, setDragIndex] = useState(null);

    /* LOAD TEST SERIES */
    useEffect(() => {
        getTestSeries().then(setTestSeries);
    }, []);

    /* LOAD MOCK TESTS */
    useEffect(() => {
        if (!testSeriesId) return;
        getMockTestsBySeries(testSeriesId).then(setMockTests);
    }, [testSeriesId]);

    /* LOAD QUESTIONS */
    useEffect(() => {
        if (!mockTestId) return;

        getQuestionsByMockTest(mockTestId).then(data => {
            if (Array.isArray(data) && data.length > 0) {
                setQuestions(data);
            } else {
                setQuestions([structuredClone(emptyQuestionTemplate)]);
            }
        });
    }, [mockTestId]);

    /* QUESTION HANDLERS */
    const updateQuestion = (i, field, value) => {
        const q = [...questions];
        q[i][field] = value;
        setQuestions(q);
    };

    const updateOption = (qi, oi, value) => {
        const q = [...questions];
        q[qi].options[oi].optionText = value;
        setQuestions(q);
    };

    const toggleCorrect = (qi, oi) => {
        const q = [...questions];
        if (q[qi].questionType !== "MULTI_SELECT") {
            q[qi].options.forEach(o => (o.isCorrect = false));
        }
        q[qi].options[oi].isCorrect = !q[qi].options[oi].isCorrect;
        setQuestions(q);
    };

    const changeQuestionType = (qi, type) => {
        const q = [...questions];
        q[qi].questionType = type;
        q[qi].options =
            type === "TRUE_FALSE"
                ? [
                    { optionKey: "A", optionText: "True", isCorrect: false },
                    { optionKey: "B", optionText: "False", isCorrect: false },
                ]
                : structuredClone(emptyQuestionTemplate.options);
        setQuestions(q);
    };

    /* DRAG */
    const onDragStart = index => setDragIndex(index);

    const onDrop = index => {
        if (dragIndex === null) return;
        const q = [...questions];
        const item = q.splice(dragIndex, 1)[0];
        q.splice(index, 0, item);
        setQuestions(q);
        setDragIndex(null);
    };

    /* SUBMIT */
    const submitQuestions = async () => {
        if (!mockTestId) return alert("Select Mock Test");

        setLoading(true);
        try {
            await saveQuestionsBulk(mockTestId, questions);
            alert("Questions saved successfully");
        } catch {
            alert("Failed to save questions");
        } finally {
            setLoading(false);
        }
    };

    return {
        testSeries,
        mockTests,
        testSeriesId,
        setTestSeriesId,
        mockTestId,
        setMockTestId,
        questions,
        setQuestions,
        loading,
        previewOpen,
        setPreviewOpen,
        updateQuestion,
        updateOption,
        toggleCorrect,
        changeQuestionType,
        onDragStart,
        onDrop,
        submitQuestions,
        emptyQuestionTemplate,
    };
}
