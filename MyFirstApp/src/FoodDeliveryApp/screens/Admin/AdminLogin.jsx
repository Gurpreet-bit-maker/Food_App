import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import { useState } from "react"
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import { OrderContext } from '../../context/FetchData.js';


const AdminLogin = () => {
    const navigation = useNavigation();
    const { adminDeshboard_data } = useContext(OrderContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    // admin login
    const login = async () => {
        try {
            const res = await axios.post("http://10.0.2.2:8080/api/admin/login", { email, password });
            console.log(res)
            if (res?.status === 201) {
                
                await adminDeshboard_data();

                setErrorMsg("");
                setEmail("");
                setPassword("");

                navigation.navigate("AdminDeshboard");
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setErrorMsg("admin not found");
            }

            console.log(error.response);

        } finally {
            setLoading(false);
        }
    }


    return (
        <View className="flex-1 bg-gray-100 px-6 justify-center">

            {/* Admin Header */}
            <View className="items-center mb-10">


                <Text className="text-3xl font-bold text-gray-900">
                    Admin Login
                </Text>

                <Text className="text-gray-500 mt-2">
                    Welcome back, Administrator
                </Text>
            </View>

            {/* Login Card */}
            <View className="bg-white rounded-2xl p-6">

                <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Email
                </Text>

                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    className="h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900"
                    placeholder="Enter admin email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                />
                {errorMsg && <Text>{errorMsg}</Text>}
                <Text className="text-sm font-semibold text-gray-700 mb-2 mt-5">
                    Password
                </Text>

                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    className="h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900"
                    placeholder="Enter admin password"
                    placeholderTextColor="#999"
                    secureTextEntry
                />

                <TouchableOpacity className="self-end mt-3">
                    <Text className="text-red-500 font-semibold">
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={login} className="h-14 bg-red-500 rounded-xl justify-center items-center mt-6">
                    {loading ? <Text>Loading ...</Text> : <Text className="text-white text-base font-bold">
                        Login as Admin
                    </Text>}
                </TouchableOpacity>

            </View>

            <Text className="text-center text-gray-400 text-xs mt-6">
                Admin access only
            </Text>

        </View>
    )
}

export default AdminLogin;

