import { Transaction } from "@/functions/financeUtils";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useTransactions(userId: string | undefined) {
    const [transactionList, setTransactionList] = useState<Transaction[]>([])

    useEffect(() => {
        if (!userId)
            return

        const fetchTransactions = async () => {
            const { data, error } = await supabase
                .from('transaction_view')
                .select('date, type, payee, category, amount, account')
                .eq('user_id', userId)
                .order('date', { ascending: false })
                .range(0, 4)

            if (error)
                throw error

            setTransactionList(data)
        }

        fetchTransactions()

    }, [userId])

    return transactionList
}