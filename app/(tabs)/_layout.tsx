import { View, Text } from 'react-native'
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
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name='transaction'
                options={{
                    title: "Transaksi",
                }}
            />
            <Tabs.Screen
                name='statistic'
                options={{
                    title: "Statistik",
                }}
            />
        </Tabs>
    )
}