import { View, Button, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { useUser } from '@/hooks/useUser'

export default function TransactionModal() {
    const user = useUser()

    const [loading, setLoading] = useState(false)

    const [type, setType] = useState("")
    const [place, setPlace] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState('')
    const [account, setAccount] = useState("")

    async function addTransaction() {
        setLoading(true)

        if (!type || !place || !category || !amount || !amount || !account) {
            Alert.alert("Fill the info")
            setLoading(false)
            return
        }

        if (!user) {
            Alert.alert("Error Accessing User")
            setLoading(false)
            return
        }

        const { error } = await supabase
            .from('transaction')
            .insert([
                { user_id: user?.id, date: new Date(), type: type, location: place, category: category, amount: Number(amount), account: account }
            ])
            .select()

        if (error) {
            Alert.alert(error.message)
        } else {
            router.back()
        }

        setLoading(false)
    }

    function amountChange(number: string) {
        if (number.length < 2) {
            setAmount(number)
            return
        }
        if (number.charAt(0) == '0') {
            setAmount('0')
            return
        }

        setAmount(number)
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <Button
                            onPress={() => router.back()}
                            title="Back"
                            disabled={loading}
                        />
                    ),
                    headerRight: () => (
                        <Button
                            onPress={() => addTransaction()}
                            title="Done"
                            disabled={loading}
                        />
                    )
                }}
            />
            <View style={{ padding: 20 }}>
                <View style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    backgroundColor: 'white'
                }}>
                    {/* Transaction Type */}
                    <TextInput style={styles.input} placeholder='Type' placeholderTextColor={"grey"} value={type} onChangeText={setType} />

                    {/* Transaction Payee */}
                    <TextInput style={styles.input} placeholder='Location' placeholderTextColor={"grey"} value={place} onChangeText={setPlace} />

                    {/* Transaction Category */}
                    <TextInput style={styles.input} placeholder='Category' placeholderTextColor={"grey"} value={category} onChangeText={setCategory} />

                    {/* Transaction Amount */}
                    <TextInput style={styles.input} placeholder='Amount' placeholderTextColor={"grey"} value={amount} onChangeText={amountChange} inputMode='numeric' />

                    {/* Transaction Account */}
                    <TextInput style={{ height: 50, padding: 10 }} placeholder='Account' placeholderTextColor={"grey"} value={account} onChangeText={setAccount} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        padding: 10,
    },
});