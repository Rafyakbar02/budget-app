import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<UserProvider>
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
			</Stack>
		</UserProvider>
	)
}
