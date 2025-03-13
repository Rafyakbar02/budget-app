import { Transaction } from "@/functions/financeUtils";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useAccountTransactions(userId: string | undefined, accountId: string | string[]) {
    const [transactionList, setTransactionList] = useState<Transaction[]>([])

    useEffect(() => {
        if (!userId || !accountId)
            return

        const fetchTransactionsByAccountId = async () => {
            const { data, error } = await supabase
                .from('transaction_view')
                .select('date, type, payee, category, amount, account')
                .eq('user_id', userId)
                .eq('account_id', accountId)
                .order('date', { ascending: false })

            if (error)
                throw error

            setTransactionList(data)
        }

        fetchTransactionsByAccountId()

    }, [userId])

    return transactionList
}