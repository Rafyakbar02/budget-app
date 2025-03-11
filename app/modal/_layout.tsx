import { Stack } from "expo-router";

export default function ModalStack() {
    return (
        <Stack>
            <Stack.Screen name="bankModal" options={{ title: "Add Account" }} />
            <Stack.Screen name="transactionModal" options={{ title: "Add Transaction" }} />
            <Stack.Screen name="choosePayee" options={{ title: "Choose Payee" }} />
            <Stack.Screen name="chooseCategory" options={{ title: "Choose Category" }} />
            <Stack.Screen name="chooseAccount" options={{ title: "Choose Account" }} />
        </Stack>
    )
}