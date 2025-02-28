import { View, Text, ScrollView, Alert, Pressable } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import rupiah from '@/functions/rupiah'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { router } from 'expo-router'
import InfoCard from '@/components/cards/infoCard'

interface Account {
    account_name: string,
    bank_name: string,
    balance: number,
}

interface Category {
    name: string,
    amount: number,
    num_of_transaction: number
}

export default function HomeTab() {
    const [user, setUser] = useState<User | null>(null)
    const [accountList, setAccountList] = useState<Account[]>([])
    const [categoryList, setCategoryList] = useState<Category[]>([])

    const totalBalance = useMemo(() => getTotalBalance(accountList), [accountList])
    const totalSpend = useMemo(() => getTotalSpend(categoryList), [categoryList])

    // Check if user is authenticated
    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setUser(user)
            } else {
                Alert.alert("Error Accessing User")
            }
        })
    }, [])

    useEffect(() => {
        if (user) {
            getAccount()
            getCategory()
        }
    }, [user]) // runs only when 'user' changes

    /**
     * Fetch user bank accounts, load to accountList and calculate sum of total balance
     */
    async function getAccount() {
        const { data, error } = await supabase
            .from('accounts')
            .select('account_name, bank_name, balance')
            .eq('user_id', user?.id)
            .order('balance', { ascending: false })

        if (error)
            throw error

        if (data) {
            setAccountList(data)
        }
    }

    /**
     * Calculate total balance of user bank accounts
     */
    function getTotalBalance(data: Account[]): number {
        if (data.length == 0) {
            return 0
        }

        const sum = data.reduce((acc, account) => acc + account.balance, 0)

        return sum
    }

    /**
     * Fetch user bank accounts, load to accountList and calculate sum of total balance
     */
    async function getCategory() {
        const { data, error } = await supabase
            .from('category_general_view')
            .select('category, total_inflow, total_outflow, num_of_transaction')
            .eq('user_id', user?.id)

        if (error)
            throw error

        if (data) {
            const formattedData = data.map(row => ({
                name: row.category,
                amount: row.total_outflow - row.total_inflow,
                num_of_transaction: row.num_of_transaction
            }));

            formattedData.sort((a, b) => {
                if (a.amount < b.amount) {
                    return 1;
                }

                if (a.amount > b.amount) {
                    return -1;
                }

                return 0;
            })

            setCategoryList(formattedData)
        }
    }

    /**
     * Calculate users total spending
     */
    function getTotalSpend(data: Category[]): number {
        if (data.length == 0) {
            return 0
        }

        const sum = data.reduce((acc, category) => acc + category.amount, 0)

        return sum
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#grey'
        }}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                {/* Gap */}
                <View style={{ paddingVertical: 10 }}></View>

                {/* Total Spend Stat */}
                <InfoCard label={"Total Pengeluaran"} value={rupiah(totalSpend)} />

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginVertical: 16
                }}>Kategori Pengeluaran</Text>

                <View style={{
                    borderRadius: 12,
                    overflow: 'hidden'
                }}>
                    {/* Category List Mapping */}
                    {categoryList.map((category, i) => (
                        <Pressable
                            key={i}
                            style={({ pressed }) => [
                                { padding: 14 },
                                i == categoryList.length - 1 ? {} : { borderBottomWidth: 1, borderBottomColor: 'lightgrey' },
                                { backgroundColor: pressed ? 'lightgrey' : "white" }
                            ]}
                            onPress={() => router.push({
                                pathname: '/category/[id]',
                                params: { id: user?.id as string, category: category.name }
                            })}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{category.name}</Text>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>{category.num_of_transaction + " Transaksi"}</Text>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'right', alignSelf: 'center' }}>{rupiah(category.amount)}</Text>
                            </View>
                        </Pressable>
                    ))}
                </View>

                {/* Gap */}
                <View style={{ paddingVertical: 20 }}></View>

                {/* Total Balance Stat */}
                <InfoCard label='Total Uang' value={rupiah(totalBalance)} />

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginVertical: 16,
                }}>Rekening</Text>

                <View style={{
                    borderRadius: 12,
                    overflow: 'hidden'
                }}>
                    {/* Account List Mapping */}
                    {accountList.map((acc, i) => (
                        <Pressable
                            key={i}
                            style={({ pressed }) => [
                                { padding: 14 },
                                i == accountList.length - 1 ? {} : { borderBottomWidth: 1, borderBottomColor: 'lightgrey' },
                                { backgroundColor: pressed ? 'lightgrey' : "white" }
                            ]}
                            onPress={() => router.push({
                                pathname: '/account/[id]',
                                params: { id: user?.id as string, account: acc.account_name }
                            })}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{acc.bank_name}</Text>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>{acc.account_name}</Text>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'right', alignSelf: 'center' }}>{rupiah(acc.balance)}</Text>
                            </View>
                        </Pressable>
                    ))}

                    {/* Add Account Button */}
                    {/* <Divider />
                    <Link href={"/modal/bankModal"} style={{ fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Tambah Rekening
                    </Link> */}

                </View>

                {/* Gap margin for bottom of ScrollView */}
                <View style={{ paddingVertical: 10 }}></View>
            </ScrollView>

        </View>
    )
}