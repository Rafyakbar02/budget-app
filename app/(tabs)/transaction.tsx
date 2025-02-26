import { View, Text, StyleSheet, Alert } from 'react-native'
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
    location: string
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
            .from('transaction')
            .select('date, type, location, category, amount, account')
            .eq('user_id', user?.id)
            .order('date', { ascending: false })

        if (error)
            throw error

        if (data) {
            setList(data)
        }
    }

    function getDate(date: string) {
        let event = new Date(date).toDateString().substring(4)
        let index = event.length - 5

        return event.slice(0, index) + "," + event.slice(index)
    }

    return (
        <View style={{
            backgroundColor: '#f7d488',
            flex: 1,
        }}>
            <ScrollView style={{
            paddingHorizontal: 20,
        }}>
            <Card>
                <Text style={{
                    fontWeight: '500',
                    fontSize: 20
                }}>Transaksi</Text>
                <Divider />
                {list.map((transact, i) => (
                    <View key={i}>
                        <Text style={{ marginBottom: 10, ...styles.text_small }}>{getDate(transact.date)}</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text style={styles.text_medium}>{transact.location}</Text>
                                <Text style={styles.text_small}>{transact.category}</Text>
                            </View>
                            <View>
                                <Text style={{ ...styles.text_medium, textAlign: 'right', color: transact.type == 'Inflow' ? 'green' : "red" }}>{transact.type == 'Inflow' ? "+ " + rupiah(transact.amount) : "- " + rupiah(transact.amount)}</Text>
                                <Text style={{ ...styles.text_small, textAlign: 'right' }}>{transact.account}</Text>
                            </View>
                        </View>
                        {i == list.length - 1 ? <></> : <Divider />}
                    </View>
                ))}
            </Card>
                
            {/* Add Button */}
            <Link href={"/transactionModal"} style={{ marginTop: 20, padding: 20, backgroundColor: 'white', fontWeight: 'bold', color: 'blue', borderRadius: 10, textAlign: 'center' }}>
                Tambah Transaksi
            </Link>

                {/* Gap margin for bottom of ScrollView */}
                <View style={{ paddingVertical: 10 }}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    text_medium: {
        fontSize: 15, fontWeight: '500', marginBottom: 5
    },
    text_small: {
        fontSize: 12
    }
})