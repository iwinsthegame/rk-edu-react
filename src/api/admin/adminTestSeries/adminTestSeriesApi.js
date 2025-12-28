import { admin_api, user_api } from "../../axiosClient"

/* USER APIs */
export const fetchExamCategoriesApi = () => {
    return user_api.get("/exam-category");
};

export const fetchPreviousTestSeriesApi = () => {
    return user_api.get("/testseries");
};

/* ADMIN APIs */
export const createTestSeriesApi = (adminId, payload) => {
    return admin_api.post(`/testseries?adminId=${adminId}`, payload);
};
