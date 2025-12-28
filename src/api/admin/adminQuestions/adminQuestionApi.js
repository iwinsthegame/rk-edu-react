import { admin_api, user_api } from "../../axiosClient";

/* USER */
export const fetchTestSeriesApi = () => {
    return user_api.get("/testseries");
};

export const fetchMockTestsBySeriesApi = (testSeriesId) => {
    return user_api.get(`/mocktest/testseries/${testSeriesId}`);
};

/* ADMIN */
export const fetchQuestionsByMockTestApi = (mockTestId) => {
    return admin_api.get(`/mocktest/${mockTestId}/questions`);
};

export const bulkSaveQuestionsApi = (mockTestId, questions) => {
    return admin_api.post(
        `/mocktest/${mockTestId}/questions/bulk`,
        questions
    );
};
