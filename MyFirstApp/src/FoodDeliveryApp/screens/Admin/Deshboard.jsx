import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { use, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from "axios"
import { OrderContext } from "../../context/FetchData.js"

export default function Deshboard() {
  const navigation = useNavigation();
  const { users } = useContext(OrderContext);

  const logout = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

      const token = credentials
        ? credentials.password
        : null;

      await axios.post(
        "http://10.0.2.2:8080/api/admin/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Keychain.resetGenericPassword();

      navigation.replace("AdminLogin");

    } catch (error) {
      console.log(error.response?.data);
    }
  };
  // console.log(users)
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

      {/* card top  */}
      <View className="flex-row flex-wrap justify-between gap-y-4">
        {/* Card 1 */}
        <View className="w-[48%] rounded-2xl bg-white p-4 shadow">
          {/* <Text className="text-2xl font-bold text-gray-800">{users.totalUsers[0].totalUsers}</Text> */}
          <Text className="mt-1 text-sm text-gray-500">Total Users</Text>
        </View>

        {/* Card 2 */}
        <View className="w-[48%] rounded-2xl bg-white p-4 shadow">
          {/* <Text className="text-2xl font-bold text-gray-800">{users.totalOrders[0].totalOrders}</Text> */}
          <Text className="mt-1 text-sm text-gray-500">Total Orders</Text>
        </View>

        {/* Card 3 */}
        <View className="w-[48%] rounded-2xl bg-white p-4 shadow">
          <Text className="text-2xl font-bold text-gray-800">3</Text>
          <Text className="mt-1 text-sm text-gray-500">Pending Orders</Text>
        </View>

        {/* Card 4 */}
        <View className="w-[48%] rounded-2xl bg-white p-4 shadow">
          <Text className="text-2xl font-bold text-gray-800">4</Text>
          <Text className="mt-1 text-sm text-gray-500">Revenue</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})