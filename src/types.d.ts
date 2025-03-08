export interface Transaction {
    id: string;
    category: string;
    amount: number;
    createdAt: string;
}

export interface ApiTransaction {
    category: string;
    amount: number;
    createdAt: string;
}

export interface TransactionsListApi {
    [id: string]: ApiTransaction;
}

export interface TransactionMutation {
    category: string;
    amount: number;
    createdAt?: string;
}

export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
}