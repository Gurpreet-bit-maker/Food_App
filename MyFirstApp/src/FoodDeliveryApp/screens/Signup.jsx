import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import * as Keychain from "react-native-keychain";

const Signup = () => {
    const navigation = useNavigation();


    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")




    const signupData = async () => {
        try {
            const res = await axios.post(
                "http://10.0.2.2:8080/api/user/singup",
                {
                    fullName,
                    email,
                    password,
                }
            );

            if (res?.status === 201) {
                const { accessToken } = res.data;

                // Token save
                await Keychain.setGenericPassword("user", accessToken);

                // Form clear
                setFullName("");
                setEmail("");
                setPassword("");

                // Login state
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log(
                "Signup Error:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <View className="flex-1 bg-white px-6 justify-center">

            {/* Header */}
            <View className="mb-8">
                <Text className="text-3xl font-bold text-gray-900">
                    Create Account 🍔
                </Text>

                <Text className="text-base text-gray-500 mt-2">
                    Sign up to order your favorite food
                </Text>
            </View>

            {/* Form */}
            <View>

                {/* Name */}
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                </Text>

                <TextInput
                    className="h-13 border border-gray-300 rounded-xl px-4 text-base text-gray-900"
                    onChangeText={(text) => setFullName(text)}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                />

                {/* Email */}
                <Text className="text-sm font-semibold text-gray-700 mb-2 mt-5">
                    Email
                </Text>

                <TextInput
                    className="h-13 border border-gray-300 rounded-xl px-4 text-base text-gray-900"
                    onChangeText={(text) => setEmail(text)}

                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                />

                {/* Password */}
                <Text className="text-sm font-semibold text-gray-700 mb-2 mt-5">
                    Password
                </Text>

                <TextInput
                    className="h-13 border border-gray-300 rounded-xl px-4 text-base text-gray-900"
                    onChangeText={(text) => setPassword(text)}

                    placeholder="Create a password"
                    placeholderTextColor="#999"
                    secureTextEntry
                />



                {/* Signup Button */}
                <TouchableOpacity onPress={signupData} className="h-16 bg-red-500 rounded-xl justify-center items-center mt-6">
                    <Text className="text-white text-base font-bold">
                        Signup
                    </Text>
                </TouchableOpacity>

                {/* Bottom Text */}
                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-500">
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>

                        <Text className="text-red-500 font-bold ml-1">
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

export default Signup