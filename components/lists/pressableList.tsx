import { View, Text, Pressable } from 'react-native'

type Props = {
    children?: React.ReactNode
};

export default function PressableList({ children }: Props) {
    return (
        <View style={{ borderRadius: 12, overflow: 'hidden', backgroundColor: 'white' }}>
            {children}
        </View>
    )
}