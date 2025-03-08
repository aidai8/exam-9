import {ApiTransaction, Transaction} from "../../types";
import {RootState} from "../../app/store.ts";
import {createSlice} from "@reduxjs/toolkit";
import {
    createTransaction,
    deleteTransaction,
    fetchOneTransactionById,
    fetchTransactions, updateTransaction
} from "./transactionsThunks.ts";


interface TransactionsState {
    items: Transaction[];
    fetchLoading: boolean;
    fetchOneLoading: boolean;
    deleteLoading: boolean | string;
    creatingLoading: boolean;
    updateLoading: boolean;
    oneTransaction: ApiTransaction | null;
}

const initialState: TransactionsState = {
    items: [],
    fetchLoading: false,
    fetchOneLoading: false,
    deleteLoading: false,
    creatingLoading: false,
    updateLoading: false,
    oneTransaction: null,
};

export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectFetchTransactionsLoading = (state: RootState) => state.transactions.fetchLoading;
export const selectFetchOneTransactionLoading = (state: RootState) => state.transactions.fetchOneLoading;
export const selectDeleteTransactionsLoading = (state: RootState) => state.transactions.deleteLoading;
export const selectCreateTransactionLoading = (state: RootState) => state.transactions.creatingLoading;
export const selectUpdateTransactionLoading = (state: RootState) => state.transactions.updateLoading;
export const selectOneTransaction = (state: RootState) => state.transactions.oneTransaction;

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        clearOneTransaction: (state) => {
            state.oneTransaction = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, {payload: transactions}) => {
                state.items = transactions;
                state.fetchLoading = false;
            })
            .addCase(fetchTransactions.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchOneTransactionById.pending, (state) => {
                state.oneTransaction = null;
                state.fetchOneLoading = true;
            })
            .addCase(fetchOneTransactionById.fulfilled, (state, {payload: transaction}) => {
                state.oneTransaction = transaction;
                state.fetchOneLoading = false;
            })
            .addCase(fetchOneTransactionById.rejected, (state) => {
                state.oneTransaction = null;
                state.fetchOneLoading = false;
            })

            .addCase(deleteTransaction.pending, (state, {meta}) => {
                state.deleteLoading = meta.arg;
            })
            .addCase(deleteTransaction.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteTransaction.rejected, (state) => {
                state.deleteLoading = false;
            })

            .addCase(createTransaction.pending, (state) => {
                state.creatingLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state) => {
                state.creatingLoading = false;
            })
            .addCase(createTransaction.rejected, (state) => {
                state.creatingLoading = false;
            })

            .addCase(updateTransaction.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateTransaction.fulfilled, (state) => {
                state.updateLoading = false;
            })
            .addCase(updateTransaction.rejected, (state) => {
                state.updateLoading = false;
            })
    }
});

export const transactionsReducer = transactionsSlice.reducer;
export const {clearOneTransaction} = transactionsSlice.actions;