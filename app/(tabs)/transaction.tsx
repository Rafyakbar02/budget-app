import { View, Text, ScrollView, Pressable } from 'react-native'
import rupiah from '@/functions/rupiah'
import { Link } from 'expo-router'
import date from '@/functions/date'
import { useUser } from '@/hooks/useUser'
import { useTransactions } from '@/hooks/useTransactions'
import Heading from '@/components/heading'
import PressableList from '@/components/lists/pressableList'
import PressableListItem from '@/components/lists/pressableListItem'

export default function TransactionTab() {
    const user = useUser()
    const transactionList = useTransactions(user?.id)

    return (
        <View style={{
            backgroundColor: '#grey',
            flex: 1,
        }}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <Heading>Transaksi</Heading>

                {/* List of Transactions */}
                <PressableList>
                    {transactionList.map((transact, i) => (
                        <PressableListItem key={i} lastItem={i == transactionList.length - 1} onPress={() => { return }}>
                            <Text style={{ fontSize: 14, marginBottom: 2, color: 'grey' }}>{date(transact.date)}</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{transact.payee}</Text>
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

                {/* Add Button */}
                <Link href={"/modal/transactionModal"} style={{ marginTop: 20, padding: 20, backgroundColor: 'white', fontWeight: 'bold', color: 'blue', borderRadius: 10, textAlign: 'center' }}>
                    Tambah Transaksi
                </Link>

                {/* Gap margin for bottom of ScrollView */}
                <View style={{ paddingVertical: 10 }}></View>
            </ScrollView>
        </View>
    )
}