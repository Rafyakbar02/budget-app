import { View, Text, StyleSheet, Alert, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '@/components/card'
import Divider from '@/components/divider'
import rupiah from '@/functions/rupiah'
import { Link } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface Transaction {
    date: string,
    type: string,
    payee: string
    category: string,
    amount: number,
    account: string
}

export default function TransactionTab() {
    const [user, setUser] = useState<User | null>(null)
    const [list, setList] = useState<Transaction[]>([])

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
        if (user) { // only call API when user is set
            getTransaction()
        }
    }, [user]) // runs when 'user' changes

    async function getTransaction() {
        const { data, error } = await supabase
            .from('transaction_view')
            .select('date, type, payee, category, amount, account')
            .eq('user_id', user?.id)
            .order('date', { ascending: false })
            .range(0, 4)

        if (error)
            throw error

        if (data) {
            setList(data)
        }
    }

    return (
        <View style={{
            backgroundColor: '#grey',
            flex: 1,
        }}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
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
                            <Text style={{ fontSize: 14, marginBottom: 2, color: 'grey' }}>{transact.date}</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{transact.payee}</Text>
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

                {/* Add Button */}
                <Link href={"/modal/transactionModal"} style={{ marginTop: 20, padding: 20, backgroundColor: 'white', fontWeight: 'bold', color: 'blue', borderRadius: 10, textAlign: 'center' }}>
                    Tambah Transaksi
                </Link>

                {/* Gap margin for bottom of ScrollView */}
                <View style={{ paddingVertical: 10 }}></View>
            </ScrollView>
        </View>
    )
}