import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useCategoryInfo(userId: string | string[], category: string | string[]) {
    const [transactionCount, setTransactionCount] = useState(0)
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        if (!userId || !category)
            return

        const fetchAccountInfo = async () => {
            const { data, error } = await supabase
                .from('category_general_view')
                .select('category, total_inflow, total_outflow, num_of_transaction')
                .eq('user_id', userId)
                .eq('category', category)

            if (error)
                throw error

            setTransactionCount(data[0].num_of_transaction)
            setAmount(data[0].total_outflow - data[0].total_inflow)
        }

        fetchAccountInfo()

    }, [userId])

    return { transactionCount, amount }
}