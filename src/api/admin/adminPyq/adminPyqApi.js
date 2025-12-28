import { admin_api, user_api } from "../../axiosClient";

export const getExamCategoriesApi = () =>
    user_api.get("/exam-category");

export const getExamSubCategoriesApi = (categoryId) =>
    user_api.get(`/exam-subcategory/category/${categoryId}`);

export const uploadPyqApi = (formData) =>
    user_api.post("/pyq/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
