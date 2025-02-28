import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function welcome() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            Alert.alert(error.message)
        }

        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            Alert.alert(error.message)
        }

        if (!session) {
            Alert.alert("Please check your inbox for email verification!")
        }

        setLoading(false)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#f7d488'
            }}>
            <Text
                style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    marginBottom: 10
                }}>
                budgetin
            </Text>
            <Text
                style={{
                    fontWeight: '300',
                    fontSize: 15,
                    marginBottom: 20
                }}>
                Atur uang jadi lebih gampang!
            </Text>

            <View style={{
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: 'white',
                marginBottom: 10
            }}>
                <TextInput
                    style={styles.input}
                    placeholder='email@address.com'
                    placeholderTextColor={'grey'}
                    autoCapitalize='none'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={{ height: 50, padding: 10 }}
                    placeholder='Password'
                    placeholderTextColor={'grey'}
                    autoCapitalize='none'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>

            <Pressable
                style={{
                    backgroundColor: 'green',
                    paddingHorizontal: 80,
                    paddingVertical: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                    marginTop: 10
                }}
                onPress={() => signInWithEmail()}
                disabled={loading}
            >
                <Text style={{ color: 'white', fontWeight: '700' }}>Masuk</Text>
            </Pressable>

            <Pressable
                style={{
                    backgroundColor: 'black',
                    paddingHorizontal: 80,
                    paddingVertical: 15,
                    borderRadius: 10,
                }}
                onPress={() => signUpWithEmail()}
                disabled={loading}
            >
                <Text style={{ color: 'white', fontWeight: '700' }}>Daftar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: 250,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        padding: 10,
    },
});