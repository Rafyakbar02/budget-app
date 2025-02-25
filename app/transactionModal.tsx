import { View, Button, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function TransactionModal() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)

    const [type, setType] = useState("")
    const [place, setPlace] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState('')
    const [account, setAccount] = useState("")

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setUser(user)
            } else {
                Alert.alert("Error Accessing User")
            }
        })
    }, [])

    async function addTransaction() {
        setLoading(true)

        if (!user) {
            Alert.alert("Error Accessing User")
            setLoading(false)
            return
        }

        const { error } = await supabase
            .from('transaction')
            .insert([
                { user_id: user.id, date: new Date(), type: type, location: place, category: category, amount: Number(amount), account: account }
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
        <View>
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
            <View style={{
                padding: 20
            }}>
                <TextInput style={styles.input} placeholder='Type' placeholderTextColor={"grey"} value={type} onChangeText={setType} />
                <TextInput style={styles.input} placeholder='Location' placeholderTextColor={"grey"} value={place} onChangeText={setPlace} />
                <TextInput style={styles.input} placeholder='Category' placeholderTextColor={"grey"} value={category} onChangeText={setCategory} />
                <TextInput style={styles.input} placeholder='Amount' placeholderTextColor={"grey"} value={amount} onChangeText={amountChange} inputMode='numeric' />
                <TextInput style={styles.input} placeholder='Account' placeholderTextColor={"grey"} value={account} onChangeText={setAccount} />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});