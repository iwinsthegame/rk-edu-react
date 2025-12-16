
import { user_api } from "../../api/axiosClient";

const mocktestService = {

    fetchTestSeries: async () => {
        const res = await user_api.get(`/testseries`);
        return res.data;
    },

    startAttempt: async (mocktestId) => {
        const res = await user_api.post(`/attempt/start/${mocktestId}/2`);
        return res.data;
    },

    fetchMocktest: async (mocktestId) => {
        const res = await user_api.get(`/mocktest/${mocktestId}`);
        return res.data;
    },

    fetchQuestions: async (mocktestId) => {
        const res = await user_api.get(`/mocktest/${mocktestId}/questions`);
        console.log('fetchQuestions response', res);
        return res.data;
    },

    saveAnswer: async (attemptId, questionId, selectedOptionIds) => {
        const res = await user_api.post(`/attempt/${attemptId}/save-answer/2`, {
            questionId,
            selectedOptionIds,
            timeSpentSeconds: 1,
        });
        return res.data;
    },

    submitAttempt: async (attemptId) => {
        const res = await user_api.post(`/attempt/${attemptId}/submit/2`);
        return res.data;
    },

    fetchResult: async (attemptId) => {

        const res = await user_api.get(`/attempt/${attemptId}/result/1`);
        return res.data;
    },


    fetchLeaderboard: async (mocktestId, limit) => {
        const res = await user_api.get(`/attempt/leaderboard/${mocktestId}/${limit}`);
        return res.data;
    }
};

export default mocktestService;
