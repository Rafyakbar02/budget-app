import { View, Text, Button, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import Card from '@/components/cards/card';
import rupiah from '@/functions/rupiah';
import { supabase } from '@/lib/supabase';
import InfoCard from '@/components/cards/infoCard';

interface Transaction {
    date: string,
    type: string,
    payee: string
    category: string,
    amount: number,
    account: string
}

export default function CategoryDetail() {
    const { id, category } = useLocalSearchParams();

    const [list, setList] = useState<Transaction[]>([])
    const [count, setCount] = useState(0)
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        getTransaction()
        getCategoryInfo()
    }, [id]) // runs when 'id' changes

    async function getTransaction() {
        const { data, error } = await supabase
            .from('transaction_view')
            .select('date, type, payee, category, amount, account')
            .eq('user_id', id)
            .eq('category', category)
            .order('date', { ascending: false })

        if (error)
            throw error

        if (data) {
            setList(data)
        }
    }

    async function getCategoryInfo() {
        const { data, error } = await supabase
            .from('category_general_view')
            .select('category, total_inflow, total_outflow, num_of_transaction')
            .eq('user_id', id)
            .eq('category', category)

        if (error)
            throw error

        if (data) {
            setCount(data[0].num_of_transaction)
            setAmount(data[0].total_outflow - data[0].total_inflow)
        }

    }

    function getDate(date: string) {
        let event = new Date(date).toDateString().substring(4)
        let index = event.length - 5

        return event.slice(0, index) + "," + event.slice(index)
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{
                title: "",
                headerLeft: () => (
                    <Button
                        onPress={() => router.back()}
                        title="Done"
                    />
                ),
            }} />
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    marginTop: 16
                }}>{category}</Text>

                <Text style={{
                    marginTop: 4,
                    marginBottom: 16,
                    fontSize: 16,
                    color: 'grey'
                }}>
                    {count} Transaksi
                </Text>

                {/* Total Spend Stat */}
                <InfoCard label='Total Pengeluaran' value={rupiah(amount)} />

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginVertical: 16
                }}>Transaksi</Text>

                <View style={{
                    borderRadius: 12,
                    overflow: 'hidden'
                }}>
                    {list.map((transact, i) => (
                        <Pressable
                            key={i}
                            style={({ pressed }) => [
                                { padding: 14 },
                                i == list.length - 1 ? {} : { borderBottomWidth: 1, borderBottomColor: 'lightgrey' },
                                { backgroundColor: pressed ? 'lightgrey' : "white" }
                            ]}
                        >
                            <Text style={{ fontSize: 14, marginBottom: 2, color: 'grey' }}>{getDate(transact.date)}</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        marginBottom: 2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                    >
                                        {transact.payee}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>{transact.category}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, textAlign: 'right', marginBottom: 2, color: transact.type == 'inflow' ? 'green' : "red" }}>{transact.type == 'inflow' ? "+ " + rupiah(transact.amount) : "- " + rupiah(transact.amount)}</Text>
                                    <Text style={{ fontSize: 14, textAlign: 'right', color: 'grey' }}>{transact.account}</Text>
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>

            </ScrollView>
        </View>
    )
}