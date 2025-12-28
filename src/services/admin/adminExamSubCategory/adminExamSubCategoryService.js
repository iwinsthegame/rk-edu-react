import {
    getExamCategoriesApi,
    getExamSubCategoriesApi,
    createExamSubCategoryApi
} from "../../../api/admin/adminExamSubCategory/adminExamSubCategoryApi";

export const fetchExamCategories = async () => {
    const res = await getExamCategoriesApi();
    return res.data;
};

export const fetchExamSubCategories = async (categoryId) => {
    const res = await getExamSubCategoriesApi(categoryId);
    return res.data;
};

export const createExamSubCategory = async (categoryId, form) => {
    await createExamSubCategoryApi(categoryId, form);
};
