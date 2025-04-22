import { supabase } from "@/lib/supabase"

/**
 * Fetch user bank accounts, load to accountList and calculate sum of total balance
 */
export async function getCategoryID(userId: string | undefined, categoryName: string | string[]) {
    const { data, error } = await supabase
        .from('categories')
        .select('category_id')
        .eq('user_id', userId)
        .eq('name', categoryName)
        .single()

    if (error) {
        return
    }

    return data.category_id
}

export async function addCategory(userId: string, categoryName: string | string[]) {
    const { data, error } = await supabase
        .from('categories')
        .upsert({
            user_id: userId,
            name: categoryName,
        })
        .select('category_id')
        .single()

    if (error) {
        throw error
    }

    return data.category_id
}