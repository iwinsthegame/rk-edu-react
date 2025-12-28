import {
    getExamCategoriesApi,
    getExamSubCategoriesApi,
    uploadPyqApi
} from "../../../api/admin/adminPyq/adminPyqApi";

export const fetchExamCategories = async () => {
    const res = await getExamCategoriesApi();
    return res.data;
};

export const fetchExamSubCategories = async (categoryId) => {
    const res = await getExamSubCategoriesApi(categoryId);
    return res.data;
};

export const uploadPyq = async (form, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(form));

    await uploadPyqApi(formData);
};
