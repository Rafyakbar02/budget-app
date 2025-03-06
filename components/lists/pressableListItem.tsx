import { Pressable } from 'react-native'

type Props = {
    children?: React.ReactNode,
    key: number,
    lastItem: boolean,
    onPress: () => void
};

export default function PressableListItem({ children, lastItem, onPress }: Props) {
    return (
        <Pressable
            style={({ pressed }) => [
                { padding: 14 },
                lastItem && { borderBottomWidth: 1, borderBottomColor: 'lightgrey' },
                { backgroundColor: pressed ? 'lightgrey' : 'white' }
            ]}
            onPress={onPress}
        >
            {children}
        </Pressable>
    )
}