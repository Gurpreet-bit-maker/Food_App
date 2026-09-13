import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from "react"
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LoaderCircle } from "lucide-react-native";



export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);

        try {
            const res = await axios.post(
                "http://10.0.2.2:8080/api/user/login",
                { email, password }
            );

            if (res?.status === 200) {
                setErrorMsg("");
                setEmail("");
                setPassword("");

                navigation.navigate("Tabs");
            }

        } catch (error) {

            if (error.response?.status === 401) {
                setErrorMsg("user not found");
            }

            console.log(error.response);

        } finally {
            setLoading(false);
        }
    };



    return (
        <View className="flex-1 bg-white px-6 justify-center">


            {/* Header */}
            <View className="mb-10">
                <Text className="text-3xl font-bold text-gray-900">
                    Welcome Back
                </Text>

                <Text className="text-base text-gray-500 mt-2">
                    Login to continue
                </Text>
            </View>

            {/* Form */}
            <View>

                <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Email
                </Text>

                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    className="h-13 border border-gray-300 rounded-xl px-4 text-base text-gray-900"
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                />
                {errorMsg && <Text>{errorMsg}</Text>}

                <Text className="text-sm font-semibold text-gray-700 mb-2 mt-5">
                    Password
                </Text>

                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    className="h-13 border border-gray-300 rounded-xl px-4 text-base text-gray-900"
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    secureTextEntry
                />

                <TouchableOpacity className="self-end mt-3">
                    <Text className="text-red-500 font-semibold">
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={login}
                    className="h-16 bg-red-500 rounded-xl justify-center items-center mt-6"
                >
                    {loading ? <Text>Loading ...</Text> : <Text className="text-white text-base font-bold">
                        Login
                    </Text>}


                </TouchableOpacity>

                
                {/* admin */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("AdminLogin")}
                    className="mt-5"
                >
                    <Text className="text-center text-red-500 font-semibold">
                        Are you an Admin? Login here
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}