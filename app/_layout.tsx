import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen
				name="transactionModal"
				options={{
					presentation: 'modal',
					title: "Transaksi",
				}}
			/>
			<Stack.Screen
				name="bankModal"
				options={{
					presentation: 'modal',
					title: "bank",
				}}
			/>
		</Stack>
	)
}
