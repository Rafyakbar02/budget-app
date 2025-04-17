import PressableList from '@/components/lists/pressableList'
import PressableListItem from '@/components/lists/pressableListItem'
import { usePayees } from '@/hooks/usePayees'
import { useUser } from '@/context/UserContext'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { View, Text, Button, ScrollView, TextInput } from 'react-native'
import { useMemo } from 'react'
import { Payee } from '@/functions/financeUtils'

export default function ChoosePayee() {
    const { selected } = useLocalSearchParams()
    const user = useUser()
    const payeeList = usePayees(user?.id)

    const sortedPayee = useMemo(() => sortPayees(payeeList), [payeeList])

    function sortPayees(list: Payee[]) {
        let sorted = [...list].sort((a, b) => {
            return a.payee.localeCompare(b.payee)
        })

        return sorted
    }


    return (
        <View>
            <Stack.Screen options={{
                presentation: 'card',
                headerLeft: () => (
                    <Button
                        onPress={() => router.back()}
                        title="Back"
                    />
                ),
            }} />

            <ScrollView style={{ paddingHorizontal: 20 }}>
                {/* Gap */}
                <View style={{ paddingVertical: 10 }}></View>

                <TextInput
                    style={{
                        height: 50,
                        borderRadius: 12,
                        backgroundColor: 'white',
                        paddingVertical: 10,
                        paddingLeft: 20,
                        fontSize: 16
                    }}
                    placeholder='Find or add payee'
                    placeholderTextColor={"grey"}
                ></TextInput>

                {/* Gap */}
                <View style={{ paddingVertical: 10 }}></View>

                <PressableList>
                    {sortedPayee.map((item, i) => (
                        <PressableListItem
                            key={i}
                            lastItem={i == sortedPayee.length - 1}
                            onPress={() => {
                                router.back()
                                router.setParams({ selectedPayee: item.payee })
                            }}
                            selected={selected == item.payee}
                        >
                            <Text style={{ fontWeight: 500, fontSize: 16, padding: 5 }}>{item.payee}</Text>

                        </PressableListItem>
                    ))}
                </PressableList>
            </ScrollView>
        </View>
    )
}