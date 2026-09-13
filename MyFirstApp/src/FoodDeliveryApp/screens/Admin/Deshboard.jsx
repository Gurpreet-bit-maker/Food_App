import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from "axios"

export default function Deshboard() {
  const navigation = useNavigation();
  
  const logout = async () => {
    try {
      const res = await axios.get("http://10.0.2.2:8080/api/user/logout");
      if (res.status == 200) {
        navigation.navigate("AdminLogin")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View className="flex-1 bg-gray-100 px-5 pt-12">

      {/* Header */}
      <View className="bg-white rounded-2xl px-5 py-4 flex-row items-center justify-between shadow-sm">
        <View>
          <Text className="text-xl font-bold text-gray-900">
            Admin Panel
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Welcome, Admin 👋
          </Text>
        </View>

        <TouchableOpacity
          onPress={logout}
          className="bg-red-500 px-5 py-3 rounded-xl"
        >
          <Text className="text-white font-bold text-sm">
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dashboard */}
      <View className="mt-6">
        <Text className="text-2xl font-bold text-gray-900">
          Dashboard
        </Text>

        <Text className="text-gray-500 mt-1">
          Manage your application from here.
        </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})