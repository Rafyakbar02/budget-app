import { View, Text, ScrollView, Alert } from 'react-native'
import Divider from '@/components/divider'
import Card from '@/components/card'
import React, { useEffect, useState } from 'react'
import rupiah from '@/functions/rupiah'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { Link } from 'expo-router'

interface Account {
    type: string,
    entity: string,
    amount: number,
}

interface Category {
    type: string,
    amount: number,
    count: number
}

export default function HomeTab() {
    const [user, setUser] = useState<User | null>(null)
    const [accountList, setAccountList] = useState<Account[]>([])
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [totalBalance, setTotalBalance] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)

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

    async function getAccount() {
        const { data, error } = await supabase
            .from('account')
            .select('type, entity, amount')
            .eq('user_id', user?.id)
            .order('amount', { ascending: false })

        if (error)
            throw error

        if (data) {
            setAccountList(data)

            const sum = data.reduce((acc, account) => acc + account.amount, 0)
            setTotalBalance(sum)
        }
    }

    async function getCategory() {
        const { data, error } = await supabase
            .from('category_view')
            .select('category, total_inflow, total_outflow, count')
            .eq('user_id', user?.id)

        if (error)
            throw error

        if (data) {
            const formattedData = data.map(row => ({
                type: row.category,
                amount: row.total_outflow - row.total_inflow,
                count: row.count
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

            const sum = formattedData.reduce((acc, cat) => acc + cat.amount, 0)
            setTotalSpend(sum)
        }


    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#grey'
        }}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                {/* Gap */}
                <View style={{ paddingVertical: 10 }}></View>

                {/* Categories */}
                <Card>
                    {/* Category List Mapping */}
                    <Text style={{ fontSize: 14 }}>Total Pengeluaran</Text>
                    <Text style={{
                        marginTop: 4,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }}>{rupiah(totalSpend)}</Text>
                </Card>

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginVertical: 16
                }}>Kategori Pengeluaran</Text>

                <Card>
                    {/* Category List Mapping */}
                    {categoryList.map((cat, i) => (
                        <View key={i}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{cat.type}</Text>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>{cat.count + " Transaksi"}</Text>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'right', alignSelf: 'center' }}>{rupiah(cat.amount)}</Text>
                            </View>
                            {i == categoryList.length - 1 ? <></> : <Divider />}
                        </View>
                    ))}
                </Card>

                {/* Gap */}
                <View style={{ paddingVertical: 20 }}></View>

                {/* Total Uang */}
                <Card>
                    <Text style={{ fontSize: 14 }}>Total Uang</Text>
                    <Text style={{
                        marginTop: 4,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }}>{rupiah(totalBalance)}</Text>
                </Card>

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginVertical: 16,
                }}>Rekening</Text>

                <Card>
                    {/* Account List Mapping */}
                    {accountList.map((acc, i) => (
                        <View key={i}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{acc.entity}</Text>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>{acc.type}</Text>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'right', alignSelf: 'center' }}>{rupiah(acc.amount)}</Text>
                            </View>
                            {i == accountList.length - 1 ? <></> : <Divider />}
                        </View>
                    ))}

                    {/* Add Account Button */}
                    <Divider />
                    <Link href={"/bankModal"} style={{ fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Tambah Rekening
                    </Link>

                </Card>

                {/* Gap margin for bottom of ScrollView */}
                <View style={{ paddingVertical: 10 }}></View>
            </ScrollView>

        </View>
    )
}