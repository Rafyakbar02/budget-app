import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen
				name="modal"
				options={{
					presentation: 'modal',
					headerShown: false
				}}
			/>
			{/* <Stack.Screen
				name="modal/bankModal"
				options={{
					presentation: 'modal',
					title: "bank",
				}}
			/> */}
			<Stack.Screen name="choose" />
		</Stack>
	)
}
