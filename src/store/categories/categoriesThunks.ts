import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Category} from "../../types";

interface CategoriesListApi {
    [id: string]: Omit<Category, "id">;
}

export const fetchCategories = createAsyncThunk<Category[], void>(
    "categories/fetchAllCategories",
    async () => {
        const response = await axiosApi.get<CategoriesListApi | null>("/categories.json");
        const categoriesData = response.data;

        if (!categoriesData) {
            return [];
        }

        return Object.keys(categoriesData).map((id) => ({
            id,
            ...categoriesData[id],
        }));
    }
);

export const createCategory = createAsyncThunk<void, Omit<Category, "id">>(
    "categories/createCategory",
    async (categoryData) => {
        await axiosApi.post("/categories.json", categoryData);
    }
);

export const deleteCategory = createAsyncThunk<void, string>(
    "categories/deleteCategory",
    async (categoryId) => {
        await axiosApi.delete(`/categories/${categoryId}.json`);
    }
);

export const updateCategory = createAsyncThunk<void, { id: string; category: Omit<Category, "id"> }>(
    "categories/updateCategory",
    async ({ id, category }) => {
        await axiosApi.put(`/categories/${id}.json`, category);
    }
);