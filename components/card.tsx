import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
    children?: React.ReactNode
};

export default function Card({ children }: Props) {
    const styles = StyleSheet.create({
        card: {
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 20,
            // shadowColor: '#000000',
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.2,
            // shadowRadius: 4,
        }
    })

    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}