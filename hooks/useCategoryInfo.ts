import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useCategoryInfo(userId: string | undefined, categoryId: string | string[]) {
    const [categoryName, setCategoryName] = useState("")
    const [totalInflow, setTotalInflow] = useState(0)
    const [totalOutflow, setTotalOutflow] = useState(0)
    const [transactionCount, setTransactionCount] = useState(0)

    useEffect(() => {
        if (!userId || !categoryId)
            return

        const fetchAccountInfo = async () => {
            const { data, error } = await supabase
                .from('category_general_view')
                .select('category, total_inflow, total_outflow, num_of_transaction')
                .eq('user_id', userId)
                .eq('category_id', categoryId)

            if (error)
                throw error

            setCategoryName(data[0].category)
            setTotalInflow(data[0].total_inflow)
            setTotalOutflow(data[0].total_outflow)
            setTransactionCount(data[0].num_of_transaction)
        }

        fetchAccountInfo()

    }, [userId])

    return { categoryName, totalInflow, totalOutflow, transactionCount }
}