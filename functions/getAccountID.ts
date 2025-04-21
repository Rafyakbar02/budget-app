import { supabase } from "@/lib/supabase";

/**
 * Fetch user bank account ID from user ID and account name
 */
export async function getAccountID(userID: string | undefined, accountName: string | string[]) {
    const { data, error } = await supabase
        .from('accounts')
        .select('account_id')
        .eq('user_id', userID)
        .eq('account_name', accountName)
        .single()

    if (error)
        throw error

    return data.account_id
}