// src/services/admin/adminMockTestService.js
import {
    fetchTestSeriesApi,
    createMockTestApi,
} from "../../../api/admin/adminMockTest/adminMockTestApi";

export const getTestSeriesList = async () => {
    const res = await fetchTestSeriesApi();
    return res.data;
};

export const createMockTest = async (testSeriesId, form) => {
    const payload = {
        title: form.title,
        durationMinutes: Number(form.durationMinutes),
        totalQuestions: Number(form.totalQuestions),
        totalMarks: Number(form.totalMarks),
        isActive: form.isActive,
    };

    const res = await createMockTestApi(testSeriesId, payload);
    return res.data;
};
