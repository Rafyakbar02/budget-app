import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react"

interface Payee {
    payee: string
}

/**
 * Fetch user payees, load to payeeList
 */
export function usePayees(userID: string | undefined) {
    const [payeeList, setPayeeList] = useState<Payee[]>([])

    useEffect(() => {
        if (!userID)
            return;

        const fetchPayees = async () => {
            const { data, error } = await supabase
                .from('transactions')
                .select('payee')
                .eq('user_id', userID)

            if (error)
                throw error

            let unique = [...new Set(data)]
            setPayeeList(unique)
        }

        fetchPayees()
    }, [userID])

    return payeeList
}