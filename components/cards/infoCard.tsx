import { Text } from 'react-native'
import Card from './card';

type Props = {
    label: string,
    value: string
}

export default function InfoCard({ label, value }: Props) {
    return (
        <Card>
            <Text style={{ fontSize: 14 }}>{label}</Text>
            <Text style={{
                marginTop: 4,
                fontSize: 30,
                fontWeight: 'bold'
            }}>{value}</Text>
        </Card>
    )
}