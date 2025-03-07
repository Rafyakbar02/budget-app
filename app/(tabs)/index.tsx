import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useMemo } from 'react'
import rupiah from '@/functions/rupiah'
import { router } from 'expo-router'
import InfoCard from '@/components/cards/infoCard'
import { useUser } from '@/hooks/useUser'
import { useAccounts } from '@/hooks/useAccounts'
import { useCategories } from '@/hooks/useCategories'
import { getTotalBalance, getTotalSpend } from '@/functions/financeUtils'
import Heading from '@/components/heading'
import PressableList from '@/components/lists/pressableList'
import PressableListItem from '@/components/lists/pressableListItem'

export default function HomeTab() {
    const user = useUser()
    const accountList = useAccounts(user?.id)
    const categoryList = useCategories(user?.id)

    const totalBalance = useMemo(() => getTotalBalance(accountList), [accountList])
    const totalSpend = useMemo(() => getTotalSpend(categoryList), [categoryList])

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#grey'
        }}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                {/* Gap */}
                <View style={{ paddingVertical: 10 }}></View>

                {/* Total Spend Stat */}
                <InfoCard label={"Total Pengeluaran"} value={rupiah(totalSpend)} />

                <Heading>Kategori Pengeluaran</Heading>

                {/* List of Spending Category */}
                <PressableList>
                    {categoryList.map((category, i) => (
                        <PressableListItem
                            key={i}
                            lastItem={i == categoryList.length - 1}
                            onPress={() => router.push({
                                pathname: '/category/[id]',
                                params: { id: user?.id as string, category: category.name }
                            })}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{category.name}</Text>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>{category.num_of_transaction + " Transaksi"}</Text>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'right', alignSelf: 'center' }}>{rupiah(category.amount)}</Text>
                            </View>
                        </PressableListItem>
                    ))}
                </PressableList>

                {/* Gap */}
                <View style={{ paddingVertical: 20 }}></View>

                {/* Total Balance Stat */}
                <InfoCard label='Total Uang' value={rupiah(totalBalance)} />

                <Heading>Rekening</Heading>

                {/* List of Accounts */}
                <PressableList>
                    {accountList.map((acc, i) => (
                        <PressableListItem
                            key={i}
                            lastItem={i == accountList.length - 1}
                            onPress={() => router.push({
                                pathname: '/account/[id]',
                                params: { id: user?.id as string, account: acc.account_name }
                            })}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{acc.bank_name}</Text>
                                    <Text style={{ fontSize: 14, color: 'grey' }}>{acc.account_name}</Text>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'right', alignSelf: 'center' }}>{rupiah(acc.balance)}</Text>
                            </View>
                        </PressableListItem>
                    ))}

                    {/* Add Account Button */}
                    {/* <Divider />
                    <Link href={"/modal/bankModal"} style={{ fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Tambah Rekening
                    </Link> */}

                </PressableList>

                {/* Gap margin for bottom of ScrollView */}
                <View style={{ paddingVertical: 10 }}></View>
            </ScrollView>

        </View>
    )
}