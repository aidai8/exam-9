import React, {useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectFetchTransactionsLoading, selectTransactions} from "../../store/transactions/transactionsSlice.ts";
import {deleteTransaction, fetchTransactions} from "../../store/transactions/transactionsThunks.ts";
import dayjs from "dayjs";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const isLoading = useAppSelector(selectFetchTransactionsLoading);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const totalAmount = useMemo(() => {
        return transactions.reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);
    }, [transactions]);

    return (
        <div>
            <h2 className="mb-4">Total: {totalAmount} KGS</h2>
            {isLoading && <p>Loading transactions...</p>}
            <ul className="list-group">
                {transactions.map((transaction) => (
                    <li key={transaction.id}
                        className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{transaction.amount} KGS</strong> ({transaction.category})<br/>
                            <small>{dayjs(transaction.createdAt).format("DD.MM.YYYY HH:mm:ss")}</small>
                        </div>
                        <div>
                            <button className="btn btn-warning btn-sm me-2">Edit</button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => dispatch(deleteTransaction(transaction.id))}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;