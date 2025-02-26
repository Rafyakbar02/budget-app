import React from 'react'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'blue',
            // headerShown: false,
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    headerTitle: "",
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name='transaction'
                options={{
                    headerTitle: "",
                    title: "Transaction",
                }}
            />
            <Tabs.Screen
                name='statistic'
                options={{
                    headerTitle: "",
                    title: "Stats",
                }}
            />
        </Tabs>
    )
}