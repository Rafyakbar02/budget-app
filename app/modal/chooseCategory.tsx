import PressableList from '@/components/lists/pressableList'
import PressableListItem from '@/components/lists/pressableListItem'
import { useCategories } from '@/hooks/useCategories'
import { useUser } from '@/context/UserContext'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { View, Text, Button, ScrollView, TextInput } from 'react-native'
import { Category } from '@/functions/financeUtils'
import { useMemo } from 'react'

export default function ChoosePayee() {
    const { selected } = useLocalSearchParams()
    const user = useUser()
    const categoryList = useCategories(user?.id)

    const sortedCategory = useMemo(() => sortCategories(categoryList), [categoryList])

    function sortCategories(list: Category[]) {
        let sorted = [...list].sort((a, b) => {
            return a.name.localeCompare(b.name)
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
                    placeholder='Find or add category'
                    placeholderTextColor={"grey"}
                ></TextInput>

                {/* Gap */}
                <View style={{ paddingVertical: 10 }}></View>

                <PressableList>
                    {sortedCategory.map((item, i) => (
                        <PressableListItem
                            key={i}
                            lastItem={i == sortedCategory.length - 1}
                            onPress={() => {
                                router.back()
                                router.setParams({ selectedCategory: item.name })
                            }}
                            selected={selected == item.name}
                        >
                            <Text style={{ fontWeight: 500, fontSize: 16, padding: 5 }}>{item.name}</Text>

                        </PressableListItem>
                    ))}
                </PressableList>
            </ScrollView>
        </View>
    )
}