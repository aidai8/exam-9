import React from "react";
import {Category} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteCategory} from "../../store/categories/categoriesThunks.ts";

interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit }) => {
    const dispatch = useAppDispatch();

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure that you want to delete this category?")) {
            await dispatch(deleteCategory(id));
        }
    };

    return (
        <ul className="list-group">
            {categories.map((category) => (
                <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {category.name} ({category.type})
                    <div>
                        <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => onEdit(category)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(category.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CategoryList;