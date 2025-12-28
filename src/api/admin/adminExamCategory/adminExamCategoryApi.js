import { admin_api, user_api } from "../../axiosClient";


export const getExamCategoriesApi = () =>
    user_api.get("/exam-category");

export const createExamCategoryApi = (payload) =>
    user_api.post("/exam-category", payload);
