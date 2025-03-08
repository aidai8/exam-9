import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneTransaction} from "../../store/transactions/transactionsSlice.ts";
import {selectCategories} from "../../store/categories/categoriesSlice.ts";
import {TransactionMutation} from "../../types";
import {createTransaction, updateTransaction} from "../../store/transactions/transactionsThunks.ts";
import {fetchCategories} from "../../store/categories/categoriesThunks.ts";

interface Props {
    show: boolean;
    onHide: () => void;
    transactionId?: string;
}

const TransactionModal: React.FC<Props> = ({ show, onHide, transactionId }) => {
    const dispatch = useAppDispatch();
    const transaction = useAppSelector(selectOneTransaction);
    const categories = useAppSelector(selectCategories);
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (transaction) {
            setType(transaction.category.includes('income') ? 'income' : 'expense');
            setCategory(transaction.category);
            setAmount(transaction.amount);
        } else {
            setType('income');
            setCategory('');
            setAmount(0);
        }
    }, [transaction]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const transactionData: TransactionMutation = {
            category,
            amount,
        };

        if (transactionId) {
            await dispatch(updateTransaction({ id: transactionId, transaction: transactionData }));
        } else {
            await dispatch(createTransaction(transactionData));
        }
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{transactionId ? 'Edit Transaction' : 'Add Transaction'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Type</Form.Label>
                        <Form.Select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
                            <option value='income'>Income</option>
                            <option value='expense'>Expense</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value='' disabled>Select category</option>
                            {categories
                                .filter(cat => cat.type === type)
                                .map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Amount (KGS)</Form.Label>
                        <Form.Control
                            type='number'
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            required
                        />
                    </Form.Group>

                    <Button variant='primary' type='submit'>Save</Button>
                    <Button variant='secondary' onClick={onHide} className='ms-2'>Cancel</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TransactionModal;