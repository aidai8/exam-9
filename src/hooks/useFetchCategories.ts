import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {fetchCategories} from "../store/categories/categoriesThunks.ts";
import {selectCategories, selectCategoriesLoading} from "../store/categories/categoriesSlice.ts";

const useFetchCategories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const loading = useAppSelector(selectCategoriesLoading);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    return { categories, loading };
};

export default useFetchCategories;