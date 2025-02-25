import { View, Text, StyleSheet, ScrollView, StatusBar, Alert } from 'react-native'
import Divider from '@/components/divider'
import Card from '@/components/card'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import rupiah from '@/functions/rupiah'
import { supabase } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'
import { Link } from 'expo-router'

interface Account {
    type: string,
    entity: string,
    amount: number,
}

export default function HomeTab() {
    const [user, setUser] = useState<User | null>(null)
    const [accountList, setAccountList] = useState<Account[]>([])
    const [total, setTotal] = useState(0)

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
        }
    }, [user]) // runs only when 'user' changes

    async function getAccount() {
        const { data, error } = await supabase
            .from('account')
            .select('type, entity, amount')
            .eq('user_id', user?.id)

        if (error)
            throw error

        if (data) {
            setAccountList(data)

            const sum = data.reduce((acc, account) => acc + account.amount, 0)
            setTotal(sum)
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#f7d488'
        }}>
            <ScrollView style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                {/* Total Uang */}
                <Card>
                    <Text>Total Uang</Text>
                    <Text style={{
                        marginTop: 5,
                        fontSize: 30,
                        fontWeight: '500'
                    }}>{rupiah(total)}</Text>
                    <Divider />

                    {/* Account List Mapping */}
                    {accountList.map((acc, i) => (
                        <View key={i}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontSize: 15, fontWeight: '500' }}>{acc.type + " " + acc.entity}</Text>
                                <Text style={{ fontSize: 15, fontWeight: '500', textAlign: 'right' }}>{rupiah(acc.amount)}</Text>
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
            </ScrollView>

        </View>
    )
}