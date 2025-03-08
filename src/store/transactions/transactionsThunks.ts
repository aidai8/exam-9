import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransaction, Transaction, TransactionMutation, TransactionsListApi} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchTransactions = createAsyncThunk<Transaction[], void>(
    'transactions/fetchAllTransactions',
    async () => {
        const response = await axiosApi<TransactionsListApi | null>('/transactions.json');
        const transactionsListObject = response.data;

        if (!transactionsListObject) {
            return [];
        } else {
            return Object.keys(transactionsListObject).map((transactionId) => {
                const transaction = transactionsListObject[transactionId];
                return {
                    ...transaction,
                    id: transactionId,
                };
            });
        }
    }
);

export const fetchOneTransactionById = createAsyncThunk<ApiTransaction, string>(
    'transactions/fetchOneTransactionById',
    async (transaction_id) => {
        const response = await axiosApi<ApiTransaction | null>(`transactions/${transaction_id}.json`);
        const transaction = response.data;

        if (!transaction) {
            throw new Error('Not found');
        }
        return transaction;
    }
);

export const updateTransaction = createAsyncThunk<void, {id: string, transaction: ApiTransaction}>(
    'transactions/updateTransaction',
    async ({id, transaction}) => {
        await axiosApi.put(`transactions/${id}.json`, transaction);
    }
);

export const createTransaction = createAsyncThunk<void, TransactionMutation>(
    'transactions/createTransaction',
    async (transactionToCreate) => {
        await axiosApi.post(`transactions.json`, transactionToCreate);
    }
);

export const deleteTransaction = createAsyncThunk<void, string>(
    'transactions/deleteTransaction',
    async (transactionId) => {
        await axiosApi.delete(`transactions/${transactionId}.json`);
    }
);