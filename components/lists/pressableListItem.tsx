import { Pressable, StyleProp, ViewStyle } from 'react-native'

type Props = {
    children?: React.ReactNode,
    lastItem?: boolean,
    onPress: () => void
    style?: StyleProp<ViewStyle>
    selected?: boolean
};

export default function PressableListItem({ children, lastItem = false, onPress, style, selected = false }: Props) {
    return (
        <Pressable
            style={({ pressed }) => [
                { padding: 14 },
                !lastItem && { borderBottomWidth: 1, borderBottomColor: 'lightgrey' },
                { backgroundColor: pressed || selected ? 'lightgrey' : '' },
                { style },
            ]}
            onPress={onPress}
        >
            {children}
        </Pressable>
    )
}