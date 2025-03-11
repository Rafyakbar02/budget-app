import PressableList from '@/components/lists/pressableList'
import PressableListItem from '@/components/lists/pressableListItem'
import { useAccounts } from '@/hooks/useAccounts'
import { useUser } from '@/hooks/useUser'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { View, Text, Button, ScrollView, TextInput } from 'react-native'

export default function ChoosePayee() {
    const { selected } = useLocalSearchParams()
    const user = useUser()
    const accountList = useAccounts(user?.id)

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
                    placeholder='Find or add account'
                    placeholderTextColor={"grey"}
                ></TextInput>

                {/* Gap */}
                <View style={{ paddingVertical: 10 }}></View>

                <PressableList>
                    {accountList.map((item, i) => (
                        <PressableListItem
                            key={i}
                            lastItem={i == accountList.length - 1}
                            onPress={() => {
                                router.back()
                                router.setParams({ selectedAccount: item.account_name })
                            }}
                            selected={selected == item.account_name}
                        >
                            <Text style={{ fontWeight: 500, fontSize: 16, padding: 5 }}>{item.account_name}</Text>

                        </PressableListItem>
                    ))}
                </PressableList>
            </ScrollView>
        </View>
    )
}