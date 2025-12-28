// src/services/admin/adminTestSeriesService.js
import {
    fetchExamCategoriesApi,
    fetchPreviousTestSeriesApi,
    createTestSeriesApi,
} from "../../../api/admin/adminTestSeries/adminTestSeriesApi";

export const getExamCategories = async () => {
    const res = await fetchExamCategoriesApi();
    return res.data;
};

export const getPreviousTestSeries = async () => {
    const res = await fetchPreviousTestSeriesApi();
    return res.data;
};

export const saveTestSeries = async (adminId, data) => {
    const res = await createTestSeriesApi(adminId, data);
    return res.data;
};
