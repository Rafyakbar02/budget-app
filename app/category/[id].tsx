import { View, Text, Button, ScrollView, Pressable } from 'react-native'
import React, { useMemo } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import rupiah from '@/functions/rupiah';
import InfoCard from '@/components/cards/infoCard';
import date from '@/functions/date';
import { useCategoryTransactions } from '@/hooks/useCategoryTransactions';
import { useCategoryInfo } from '@/hooks/useCategoryInfo';
import Heading from '@/components/heading';
import PressableList from '@/components/lists/pressableList';
import PressableListItem from '@/components/lists/pressableListItem';
import { getTotalTransactionSpend } from '@/functions/financeUtils';
import { useUser } from '@/context/UserContext';

export default function CategoryDetail() {
    const user = useUser()
    const { id } = useLocalSearchParams(); // categoryId

    const transactionList = useCategoryTransactions(user?.id, id)
    const { categoryName, totalInflow, totalOutflow, transactionCount } = useCategoryInfo(user?.id, id)
    const totalSpend = useMemo(() => totalOutflow - totalInflow, [transactionList])

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
                <Heading size='xl'>{categoryName}</Heading>

                <Text style={{
                    marginTop: 4,
                    marginBottom: 16,
                    fontSize: 16,
                    color: 'grey'
                }}>
                    {transactionCount} Transaksi
                </Text>

                {/* Total Spend Stat */}
                {totalSpend > 0 && <InfoCard label='Total Pengeluaran' value={rupiah(totalSpend)} />}

                {transactionList.length > 0 &&
                    <>
                        <Heading>Transaksi</Heading>

                        <PressableList>
                            {transactionList.map((transact, i) => (
                                <PressableListItem
                                    key={i}
                                    lastItem={i == transactionList.length - 1}
                                    onPress={() => { return }}
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
                                </PressableListItem>
                            ))}
                        </PressableList>
                    </>
                }
            </ScrollView>
        </View>
    )
}