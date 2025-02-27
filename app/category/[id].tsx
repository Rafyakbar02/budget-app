import { View, Text, Button, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import Card from '@/components/card';
import rupiah from '@/functions/rupiah';
import { supabase } from '@/lib/supabase';

interface Transaction {
    date: string,
    type: string,
    location: string
    category: string,
    amount: number,
    account: string
}

export default function CategoryDetail() {
    const { id, type } = useLocalSearchParams();

    const [list, setList] = useState<Transaction[]>([])
    const [count, setCount] = useState(0)
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        getTransaction()
        getCategoryInfo()
    }, [id]) // runs when 'id' changes

    async function getTransaction() {
        const { data, error } = await supabase
            .from('transaction')
            .select('date, type, location, category, amount, account')
            .eq('user_id', id)
            .eq('category', type)
            .order('date', { ascending: false })

        if (error)
            throw error

        if (data) {
            setList(data)
        }
    }

    async function getCategoryInfo() {
        const { data, error } = await supabase
            .from('category_view')
            .select('category, total_inflow, total_outflow, count')
            .eq('user_id', id)
            .eq('category', type)

        if (error)
            throw error

        if (data) {
            setCount(data[0].count)
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
                }}>{type}</Text>

                <Text style={{
                    marginTop: 4,
                    marginBottom: 16,
                    fontSize: 16,
                    color: 'grey'
                }}>
                    {count} Transaksi
                </Text>

                <Card>
                    <Text style={{ fontSize: 14 }}>Total Pengeluaran</Text>
                    <Text style={{
                        marginTop: 4,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }}>{rupiah(amount)}</Text>
                </Card>

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
                                        {transact.location}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>{transact.category}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, textAlign: 'right', marginBottom: 2, color: transact.type == 'Inflow' ? 'green' : "red" }}>{transact.type == 'Inflow' ? "+ " + rupiah(transact.amount) : "- " + rupiah(transact.amount)}</Text>
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