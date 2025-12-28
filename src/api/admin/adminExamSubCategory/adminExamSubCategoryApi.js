import { admin_api, user_api } from "../../axiosClient"

export const getExamCategoriesApi = () =>
    user_api.get("/exam-category");

export const getExamSubCategoriesApi = (categoryId) =>
    user_api.get(`/exam-subcategory/${categoryId}`);

export const createExamSubCategoryApi = (categoryId, payload) =>
    user_api.post(`/exam-subcategory/${categoryId}`, payload);
