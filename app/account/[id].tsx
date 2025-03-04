import { View, Text, Button, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import rupiah from '@/functions/rupiah';
import InfoCard from '@/components/cards/infoCard';
import date from '@/functions/date';
import { useAccountTransactions } from '@/hooks/useAccountTransactions';
import { useAccountInfo } from '@/hooks/useAccountInfo';

export default function AccountDetail() {
    const { id, account } = useLocalSearchParams();

    const transactionList = useAccountTransactions(id, account)
    const { transactionCount, amount, balance } = useAccountInfo(id, account)

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
                }}>{account}</Text>

                <Text style={{
                    marginTop: 4,
                    marginBottom: 16,
                    fontSize: 16,
                    color: 'grey'
                }}>
                    {transactionCount} Transaksi
                </Text>

                {/* Total Balance Stat */}
                <InfoCard label='Saldo Rekening' value={rupiah(balance)} />

                {/* Gap */}
                <View style={{ paddingVertical: 10 }}></View>

                {/* Total Spend Stat */}
                <InfoCard label='Total Pengeluaran' value={rupiah(amount)} />

                {transactionList.length > 0 &&
                    <>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            marginVertical: 16
                        }}>Transaksi</Text>

                        <View style={{
                            borderRadius: 12,
                            overflow: 'hidden'
                        }}>
                            {transactionList.map((transact, i) => (
                                <Pressable
                                    key={i}
                                    style={({ pressed }) => [
                                        { padding: 14 },
                                        i == transactionList.length - 1 ? {} : { borderBottomWidth: 1, borderBottomColor: 'lightgrey' },
                                        { backgroundColor: pressed ? 'lightgrey' : "white" }
                                    ]}
                                >
                                    <Text style={{ fontSize: 14, marginBottom: 2, color: 'grey' }}>{date(transact.date)}</Text>
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
                    </>
                }

            </ScrollView>
        </View>
    )
}