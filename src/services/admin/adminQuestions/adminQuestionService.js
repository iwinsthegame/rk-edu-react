import {
    fetchTestSeriesApi,
    fetchMockTestsBySeriesApi,
    fetchQuestionsByMockTestApi,
    bulkSaveQuestionsApi,
} from "../../../api/admin/adminQuestions/adminQuestionApi";

export const getTestSeries = async () => {
    const res = await fetchTestSeriesApi();
    return res.data;
};

export const getMockTestsBySeries = async (testSeriesId) => {
    const res = await fetchMockTestsBySeriesApi(testSeriesId);
    return res.data;
};

export const getQuestionsByMockTest = async (mockTestId) => {
    const res = await fetchQuestionsByMockTestApi(mockTestId);
    return res.data;
};

export const saveQuestionsBulk = async (mockTestId, questions) => {
    const res = await bulkSaveQuestionsApi(mockTestId, questions);
    return res.data;
};
