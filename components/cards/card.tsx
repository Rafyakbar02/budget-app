import { View, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
    children?: React.ReactNode
};

export default function Card({ children }: Props) {
    const styles = StyleSheet.create({
        card: {
            borderRadius: 12,
            backgroundColor: 'white',
            padding: 14,
        }
    })

    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}