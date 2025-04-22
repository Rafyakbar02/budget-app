import { Text } from 'react-native'

type Props = {
    children?: React.ReactNode,
    size?: string
}

export default function Heading({ children, size = "md" }: Props,) {
    if (size == "md") {
        return (
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginVertical: 16
            }}>{children}</Text>
        )
    }

    if (size == "xl") {
        return (
            <Text style={{
                fontWeight: 'bold',
                fontSize: 30,
                marginVertical: 16
            }}>{children}</Text>
        )
    }

}