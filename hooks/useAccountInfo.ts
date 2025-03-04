import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useAccountInfo(userId: string | string[], account: string | string[]) {
    const [transactionCount, setTransactionCount] = useState(0)
    const [amount, setAmount] = useState(0)
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        if (!userId || !account)
            return

        const fetchAccountInfo = async () => {
            const { data, error } = await supabase
                .from('account_general_view')
                .select('total_inflow, total_outflow, num_of_transaction, balance')
                .eq('user_id', userId)
                .eq('account_name', account)

            if (error)
                throw error

            if (data) {
                setTransactionCount(data[0].num_of_transaction)
                setAmount(data[0].total_outflow - data[0].total_inflow)
                setBalance(data[0].balance)
            }
        }

        fetchAccountInfo()

    }, [userId])

    return { transactionCount, amount, balance }
}