import { View, Button, TextInput, StyleSheet, Alert, Text } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { useUser } from '@/hooks/useUser'
import OptionList from '@/components/lists/optionList'
import CurrencyInput from '@/components/currencyInput'
import PressableList from '@/components/lists/pressableList'

export default function TransactionModal() {
    const user = useUser()

    const [loading, setLoading] = useState(false)

    const [type, setType] = useState("")
    const [amount, setAmount] = useState(0)

    const [place, setPlace] = useState("")
    const [category, setCategory] = useState("")

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

            <OptionList
                options={
                    ["Inflow", "Outflow"]
                }
                checkedValue={type}
                onChange={setType}
            />

            <View style={{ padding: 20 }}>
                <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
                    <Text style={{ fontSize: 45, fontWeight: 'bold' }}>Rp</Text>
                    <CurrencyInput style={{ fontSize: 45, fontWeight: 'bold' }} value={amount} onChangeValue={setAmount} />
                </View>

                <PressableList>
                    {/* Transaction Payee */}
                    <TextInput style={styles.input} placeholder='Location' placeholderTextColor={"grey"} value={place} onChangeText={setPlace} />

                    {/* Transaction Category */}
                    <TextInput style={styles.input} placeholder='Category' placeholderTextColor={"grey"} value={category} onChangeText={setCategory} />

                    {/* Transaction Account */}
                    <TextInput style={{ height: 50, padding: 10 }} placeholder='Account' placeholderTextColor={"grey"} value={account} onChangeText={setAccount} />
                </PressableList>
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