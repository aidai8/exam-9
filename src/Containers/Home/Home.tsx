import React, {useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectFetchTransactionsLoading, selectTransactions} from "../../store/transactions/transactionsSlice.ts";
import {deleteTransaction, fetchTransactions} from "../../store/transactions/transactionsThunks.ts";
import dayjs from "dayjs";
import useFetchCategories from "../../hooks/useFetchCategories.ts";
import TransactionModal from "../../components/TransactionModal/TransactionModal.tsx";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const isLoadingTransactions = useAppSelector(selectFetchTransactionsLoading);
    const { categories, loading: isLoadingCategories } = useFetchCategories();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const totalAmount = useMemo(() => {
        return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    }, [transactions]);

    const getCategoryName = (categoryId: string) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? { name: category.name, type: category.type } : { name: "Unknown", type: "unknown" };
    };

    const getFormattedAmount = (amount: number, type: string) => {
        return type === "income" ? `+${amount} KGS` : `-${amount} KGS`;
    };

    const handleEdit = (transaction: any) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleDelete = (transactionId: string) => {
        if (window.confirm("Are you sure that you want to delete this transaction?")) {
            dispatch(deleteTransaction(transactionId));
        }
    };

    return (
        <div>
            <h2 className="mb-4">Total: {totalAmount} KGS</h2>
            {(isLoadingTransactions || isLoadingCategories) && <p>Loading transactions...</p>}
            <ul className="list-group">
                {transactions.map((transaction) => {
                    const { name, type } = getCategoryName(transaction.category);
                    return (
                        <li key={transaction.id}
                            className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{getFormattedAmount(transaction.amount, type)}</strong> ({name}, {type})<br/>
                                <small>{dayjs(transaction.createdAt).format("DD.MM.YYYY HH:mm:ss")}</small>
                            </div>
                            <div>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(transaction)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(transaction.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {isModalOpen && editingTransaction && (
                <TransactionModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingTransaction(null);
                    }}
                    transaction={editingTransaction}
                />
            )}
        </div>
    );
};

export default Home;