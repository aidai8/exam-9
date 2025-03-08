import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {Category} from "../../types";
import {
    fetchCategories,
    createCategory,
    deleteCategory,
    updateCategory,
} from "./categoriesThunks.ts";

interface CategoriesState {
    items: Category[];
    fetchLoading: boolean;
    creatingLoading: boolean;
    deletingLoading: boolean | string;
    updatingLoading: boolean;
}

const initialState: CategoriesState = {
    items: [],
    fetchLoading: false,
    creatingLoading: false,
    deletingLoading: false,
    updatingLoading: false,
};

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesLoading = (state: RootState) => state.categories.fetchLoading;
export const selectCreateCategoryLoading = (state: RootState) => state.categories.creatingLoading;
export const selectDeleteCategoryLoading = (state: RootState) => state.categories.deletingLoading;
export const selectUpdateCategoryLoading = (state: RootState) => state.categories.updatingLoading;

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
                state.items = categories;
                state.fetchLoading = false;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(createCategory.pending, (state) => {
                state.creatingLoading = true;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.creatingLoading = false;
            })
            .addCase(createCategory.rejected, (state) => {
                state.creatingLoading = false;
            })

            .addCase(deleteCategory.pending, (state, { meta }) => {
                state.deletingLoading = meta.arg;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.deletingLoading = false;
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.deletingLoading = false;
            })

            .addCase(updateCategory.pending, (state) => {
                state.updatingLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.updatingLoading = false;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.updatingLoading = false;
            });
    },
});

export const categoriesReducer = categoriesSlice.reducer;