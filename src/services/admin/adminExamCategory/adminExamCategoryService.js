import {
    getExamCategoriesApi,
    createExamCategoryApi
} from "../../../api/admin/adminExamCategory/adminExamCategoryApi";

export const fetchExamCategories = async () => {
    const res = await getExamCategoriesApi();
    return res.data;
};

export const createExamCategory = async (form) => {
    await createExamCategoryApi(form);
};
