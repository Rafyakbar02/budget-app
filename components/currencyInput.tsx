import { TextInput, TextStyle } from 'react-native'

interface Prop {
    style?: TextStyle,
    value: number,
    onChangeValue: Function
}

export default function CurrencyInput({ style, value, onChangeValue }: Prop) {
    function handleChange(value: string) {
        let decimal = Number(value.replace(/\D/g, ''))

        if (!decimal)
            decimal = 0

        if (decimal > 999999999)
            return

        onChangeValue(decimal)
    }

    function currency(value: number) {
        let newCurrency = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(value).replace("Rp", '')

        return newCurrency.slice(0, newCurrency.length - 3)
    }

    return (
        <TextInput style={style} inputMode='numeric' value={currency(value)} onChangeText={handleChange} />
    )
}