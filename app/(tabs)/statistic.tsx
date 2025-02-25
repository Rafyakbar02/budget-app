import { View, Text, StatusBar, Pressable, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '@/lib/supabase'

export default function StatisticTab() {
    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            Alert.alert("Error Logout", error.message)
        }
    }

    return (
        <View style={{
            backgroundColor: '#f7d488',
            flex: 1
        }}>
            <View style={{ padding: 20 }}>
                <Pressable
                    style={{
                        backgroundColor: 'red',
                        paddingHorizontal: 80,
                        paddingVertical: 15,
                        borderRadius: 10,
                    }}
                    onPress={() => logout()}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Logout</Text>
                </Pressable>
            </View>
        </View>

    )
}