import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		// Check if there is mounted session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
			if (session) {
				// If there is an active session, navigate to the main app
				router.replace("/(tabs)")
			}
		})

		// Check for auth state change
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)

			if (session) {
				router.replace("/(tabs)") // navigate to main app if authenticated
			} else {
				router.replace("/(auth)/welcome") // navigate to welcome screen if not authenticated
			}
		})
	}, [])
}
