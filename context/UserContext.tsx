import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface Props {
    children: React.ReactNode
}

type UserContextType = User | null

const UserContext = createContext<UserContextType>(null)

export function UserProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setUser(user)
            } else {
                Alert.alert("Error Accessing User")
            }
        })

        console.log("useUser hook re-rendered")
    }, [])

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext) as User | null