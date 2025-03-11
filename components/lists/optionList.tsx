import { View, Text, Pressable } from 'react-native'
import React from 'react'

interface Props {
    options: string[],
    checkedValue: string,
    onChange: Function,
}

export default function OptionList({ options, checkedValue, onChange }: Props) {
    return (
        <View
            style={{
                marginTop: 20, paddingHorizontal: 20, flexDirection: 'row', gap: 20
            }}
        >
            {options.map((option, i) => {
                let active = checkedValue === option as string

                return (
                    <Pressable
                        key={i}
                        style={({ pressed }) => [
                            { flex: 1, justifyContent: 'center', borderRadius: 12, paddingVertical: 20 },
                            { backgroundColor: pressed ? 'lightgrey' : 'white' },
                            { borderColor: active ? 'black' : '' },
                            { borderWidth: active ? 1 : 0 }
                        ]}
                        onPress={() => {
                            onChange(option)
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 500 }}>{option}</Text>
                    </Pressable>
                )
            })}
        </View >
    )
}