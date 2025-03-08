import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import {useAppDispatch} from "../../app/hooks.ts";
import {Transaction} from "../../types";
import {updateTransaction} from "../../store/transactions/transactionsThunks.ts";
import useFetchCategories from "../../hooks/useFetchCategories.ts";

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction;
}

const TransactionModal: React.FC<TransactionModalProps> = ({isOpen, onClose, transaction}) => {
    const dispatch = useAppDispatch();
    const {categories, loading} = useFetchCategories();

    const [formData, setFormData] = useState({
        amount: transaction?.amount || "",
        categoryId: transaction?.category || "",
    });

    useEffect(() => {
        if (transaction) {
            setFormData({
                amount: transaction.amount.toString(),
                categoryId: transaction.category,
            });
        }
    }, [transaction]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (formData.amount && formData.categoryId) {
            await dispatch(updateTransaction({ ...transaction, ...formData, amount: +formData.amount }));
            onClose();
        } else {
            alert("Please fill all fields!");
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (<p>Loading categories...</p>
                ) : (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                            >
                                <option value="">Select a category</option>
                                {categories?.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name} ({category.type === "income" ? "+" : "-"})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TransactionModal;