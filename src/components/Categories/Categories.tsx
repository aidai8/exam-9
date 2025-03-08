import {useState} from "react";
import CategoryModal from "../CategoriesModal/CategoriesModal.tsx";
import {Category} from "../../types";
import useFetchCategories from "../../hooks/useFetchCategories.ts";
import CategoryList from "../CategoryList/CategoryList.tsx";


const Categories = () => {
    const { categories, loading } = useFetchCategories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    return (
        <div>
            <h2>Categories</h2>
            <button className="btn btn-primary mb-3" onClick={() => setIsModalOpen(true)}>
                Add category
            </button>

            {loading && <p>Loading...</p>}

            <CategoryList
                categories={categories}
                onEdit={(category) => {
                    setEditingCategory(category);
                    setIsModalOpen(true);
                }}
            />

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