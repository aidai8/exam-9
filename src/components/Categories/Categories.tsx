import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCategories, selectCategoriesLoading} from "../../store/categories/categoriesSlice.ts";
import {useEffect, useState} from "react";
import {deleteCategory, fetchCategories} from "../../store/categories/categoriesThunks.ts";
import CategoryModal from "../CategoriesModal/CategoriesModal.tsx";
import {Category} from "../../types";


const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const loading = useAppSelector(selectCategoriesLoading);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure that you want to delete this category?")) {
            await dispatch(deleteCategory(id));
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <button className="btn btn-primary mb-3" onClick={() => setIsModalOpen(true)}>
                Add category
            </button>

            {loading && <p>Loading...</p>}

            <ul className="list-group">
                {categories.map((category) => (
                    <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {category.name} ({category.type})
                        <div>
                            <button className="btn btn-warning btn-sm me-2"
                                    onClick={() => {
                                        setEditingCategory(category);
                                        setIsModalOpen(true);
                                    }}>
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(category.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <CategoryModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingCategory(null);
                    }}
                    category={editingCategory}
                />
            )}
        </div>
    );
};

export default Categories;