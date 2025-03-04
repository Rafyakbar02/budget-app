// interfaces for reusability
export interface Account {
    account_name: string;
    bank_name: string;
    balance: number;
}

export interface Category {
    name: string;
    amount: number;
    num_of_transaction: number;
}

export interface Transaction {
    date: string,
    type: string,
    payee: string
    category: string,
    amount: number,
    account: string
}

/**
 * Calculate total balance from an array of accounts
 */
export function getTotalBalance(accounts: Account[]): number {
    return accounts.reduce((sum, account) => sum + account.balance, 0);
}

/**
 * Calculate total spending from an array of categories
 */
export function getTotalSpend(categories: Category[]): number {
    return categories.reduce((sum, category) => sum + category.amount, 0);
}
