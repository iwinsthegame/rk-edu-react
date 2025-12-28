
import { admin_api, user_api } from "../../axiosClient"

/* USER */
export const fetchTestSeriesApi = () => {
    return user_api.get("/testseries");
};

/* ADMIN */
export const createMockTestApi = (testSeriesId, payload) => {
    return admin_api.post(
        `/testseries/${testSeriesId}/mocktests`,
        payload
    );
};
