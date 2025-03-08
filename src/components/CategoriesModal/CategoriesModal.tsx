import {Category} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import React, {useEffect, useState} from "react";
import {createCategory, updateCategory} from "../../store/categories/categoriesThunks.ts";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category | null;
}

const CategoryModal = ({ isOpen, onClose, category }: CategoryModalProps) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<'income' | 'expense'>('income');

    useEffect(() => {
        if (category) {
            setName(category.name);
            setType(category.type);
        }
    }, [category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newCategory = {
            name,
            type,
        };

        if (category) {
            await dispatch(updateCategory({ id: category.id, category: newCategory }));
        } else {
            await dispatch(createCategory(newCategory));
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{category ? "Edit Category" : "Add Category"}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="categoryName" className="form-label">Category Name</label>
                                <input
                                    type="text"
                                    id="categoryName"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoryType" className="form-label">Category Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                                    required
                                    className="form-control"
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {category ? "Save Changes" : "Add Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;