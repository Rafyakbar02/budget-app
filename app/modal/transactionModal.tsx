import { View, Button, TextInput, StyleSheet, Alert, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { useUser } from '@/hooks/useUser'
import OptionList from '@/components/lists/optionList'
import CurrencyInput from '@/components/currencyInput'
import PressableList from '@/components/lists/pressableList'
import PressableListItem from '@/components/lists/pressableListItem'

export default function TransactionModal() {
    const user = useUser()
    const router = useRouter()
    const { selectedPayee, selectedCategory, selectedAccount } = useLocalSearchParams()

    const [loading, setLoading] = useState(false)

    const [type, setType] = useState("Outflow")
    const [amount, setAmount] = useState(0)

    const [payee, setPayee] = useState<string | string[]>()
    const [category, setCategory] = useState<string | string[]>()
    const [account, setAccount] = useState<string | string[]>()

    useEffect(() => {
        setPayee(selectedPayee)
        setCategory(selectedCategory)
        setAccount(selectedAccount)
    }, [selectedPayee, selectedCategory, selectedAccount])

    async function addTransaction() {
        setLoading(true)

        if (!type || !payee || !category || !amount || !amount || !account) {
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
                { user_id: user?.id, transaction_date: new Date(), transaction_type: type, payee: payee, category_id: category, amount: amount, account_id: account }
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
                            // disabled={loading}
                            disabled={true}
                        />
                    )
                }}
            />

            <OptionList
                options={
                    ["Outflow", "Inflow"]
                }
                checkedValue={type}
                onChange={setType}
            />

            <View style={{ padding: 20 }}>
                <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
                    <Text style={{ fontSize: 45, fontWeight: 'bold', color: type == "Inflow" ? 'green' : 'red' }}>Rp</Text>
                    <CurrencyInput style={{ fontSize: 45, fontWeight: 'bold', color: type == "Inflow" ? 'green' : 'red' }} value={amount} onChangeValue={setAmount} />
                </View>

                <PressableList>
                    {/* Transaction Payee */}
                    <PressableListItem onPress={() => router.push({
                        pathname: '/modal/choosePayee',
                        params: {
                            selected: payee
                        }
                    })}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 5
                        }}>
                            {!payee ? <Text style={{ fontWeight: 500, fontSize: 16, color: 'grey' }}>Choose Payee</Text> :
                                <View>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>Payee</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500 }}>{payee}</Text>
                                </View>
                            }
                            <Text style={{ fontWeight: 500, fontSize: 16, color: 'grey' }}>{">"}</Text>
                        </View>
                    </PressableListItem>

                    {/* Transaction Category */}
                    <PressableListItem onPress={() => router.push({
                        pathname: '/modal/chooseCategory',
                        params: {
                            selected: category
                        }
                    })}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 5
                        }}>
                            {!category ? <Text style={{ fontWeight: 500, fontSize: 16, color: 'grey' }}>Choose Category</Text> :
                                <View>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>Category</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500 }}>{category}</Text>
                                </View>
                            }
                            <Text style={{ fontWeight: 500, fontSize: 16, color: 'grey' }}>{">"}</Text>
                        </View>
                    </PressableListItem>

                    {/* Transaction Account */}
                    <PressableListItem lastItem={true} onPress={() => router.push({
                        pathname: '/modal/chooseAccount',
                        params: {
                            selected: account
                        }
                    })}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 5
                        }}>
                            {!account ? <Text style={{ fontWeight: 500, fontSize: 16, color: 'grey' }}>Choose Account</Text> :
                                <View>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>Account</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500 }}>{account}</Text>
                                </View>
                            }
                            <Text style={{ fontWeight: 500, fontSize: 16, color: 'grey' }}>{">"}</Text>
                        </View>
                    </PressableListItem>
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