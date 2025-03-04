import { View, Text, ScrollView, Pressable } from 'react-native'
import rupiah from '@/functions/rupiah'
import { Link } from 'expo-router'
import date from '@/functions/date'
import { useUser } from '@/hooks/useUser'
import { useTransactions } from '@/hooks/useTransactions'

export default function TransactionTab() {
    const user = useUser()
    const transactionList = useTransactions(user?.id)

    return (
        <View style={{
            backgroundColor: '#grey',
            flex: 1,
        }}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
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
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{transact.payee}</Text>
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