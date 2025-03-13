import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useAccountInfo(userId: string | undefined, accountId: string | string[]) {
    const [accountName, setAccountName] = useState("")
    const [bankName, setBankName] = useState("")
    const [totalInflow, setTotalInflow] = useState(0)
    const [totalOutflow, setTotalOutflow] = useState(0)
    const [transactionCount, setTransactionCount] = useState(0)
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        if (!userId || !accountId)
            return

        const fetchAccountInfo = async () => {
            const { data, error } = await supabase
                .from('account_general_view')
                .select('account_name, bank_name, total_inflow, total_outflow, num_of_transaction, balance')
                .eq('user_id', userId)
                .eq('account_id', accountId)

            if (error)
                throw error

            if (data) {
                setAccountName(data[0].account_name)
                setBankName(data[0].bank_name)
                setTotalInflow(data[0].total_inflow)
                setTotalOutflow(data[0].total_outflow)
                setTransactionCount(data[0].num_of_transaction)
                setBalance(data[0].balance)
            }
        }

        fetchAccountInfo()

    }, [userId])

    return { accountName, bankName, totalInflow, totalOutflow, transactionCount, balance }
}