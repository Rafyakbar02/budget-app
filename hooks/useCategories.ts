import { Category } from "@/functions/financeUtils"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

/**
 * Fetch user bank accounts, load to accountList and calculate sum of total balance
 */
export function useCategories(userId: string | undefined) {
    const [categoryList, setCategoryList] = useState<Category[]>([])

    useEffect(() => {
        if (!userId)
            return

        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('category_general_view')
                .select('category, total_inflow, total_outflow, num_of_transaction')
                .eq('user_id', userId)

            if (error)
                throw error

            const formattedData = data.map(row => ({
                name: row.category,
                amount: row.total_outflow - row.total_inflow,
                num_of_transaction: row.num_of_transaction
            })).sort((a, b) => b.amount - a.amount);

            setCategoryList(formattedData)
        }

        fetchCategories()
    }, [userId])

    return categoryList
}