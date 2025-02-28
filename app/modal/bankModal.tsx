import { View, Button, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function BankModal() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)

    const [type, setType] = useState("")
    const [entity, setEntity] = useState("")
    const [amount, setAmount] = useState('')

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

    async function addTransaction() {
        setLoading(true)

        if (!user) {
            Alert.alert("Error Accessing User")
            setLoading(false)
            return
        }

        const { error } = await supabase
            .from('account')
            .insert([
                { user_id: user.id, type: type, entity: entity, amount: Number(amount) }
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
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: 'white',
                marginBottom: 10
            }}>
                <TextInput style={styles.input} placeholder='Type' placeholderTextColor={"grey"} value={type} onChangeText={setType} />
                <TextInput style={styles.input} placeholder='Entity' placeholderTextColor={"grey"} value={entity} onChangeText={setEntity} />
                <TextInput style={styles.input} placeholder='Amount' placeholderTextColor={"grey"} value={amount} onChangeText={amountChange} inputMode='numeric' />

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