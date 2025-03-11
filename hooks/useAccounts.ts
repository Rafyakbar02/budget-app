import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react"
import { Account } from '@/functions/financeUtils'

/**
 * Fetch user bank accounts, load to accountList and calculate sum of total balance
 */
export function useAccounts(userID: string | undefined) {
    const [accountList, setAccountList] = useState<Account[]>([])

    useEffect(() => {
        if (!userID)
            return;

        const fetchAccounts = async () => {
            const { data, error } = await supabase
                .from('accounts')
                .select('account_id, account_name, bank_name, balance')
                .eq('user_id', userID)
                .order('balance', { ascending: false })

            if (error)
                throw error

            setAccountList(data)
        }

        fetchAccounts()
    }, [userID])

    return accountList
}