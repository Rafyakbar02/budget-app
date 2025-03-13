import { Transaction } from "@/functions/financeUtils"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export function useCategoryTransactions(userId: string | undefined, categoryId: string | string[]) {
    const [transactionList, setTransactionList] = useState<Transaction[]>([])

    useEffect(() => {
        if (!userId || !categoryId)
            return

        const fetchTransactionsByCategoryId = async () => {
            const { data, error } = await supabase
                .from('transaction_view')
                .select('date, type, payee, category, amount, account')
                .eq('user_id', userId)
                .eq('category_id', categoryId)
                .order('date', { ascending: false })

            if (error)
                throw error

            setTransactionList(data)
        }

        fetchTransactionsByCategoryId()

    }, [userId])

    return transactionList
}