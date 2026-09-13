import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { OrderContext } from '../../context/FetchData.js';



export default function Deshboard() {
  const navigation = useNavigation();
  const { users } = useContext(OrderContext);

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://10.0.2.2:8080/api/admin/logout");

      if (res.status === 200) {
        navigation.replace("AdminLogin");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  console.log(users)
  return (
    <View className="flex-1 bg-gray-100 px-5 pt-12">
      {/* Header */}
      <View className="bg-white rounded-2xl px-5 py-4 flex-row items-center justify-between shadow-sm">
        <View>
          <Text className="text-xl font-bold text-gray-900">Admin Panel</Text>

          <Text className="text-sm text-gray-500 mt-1">Welcome, Admin 👋</Text>
        </View>

        <TouchableOpacity
          onPress={logout}
          className="bg-red-500 px-5 py-3 rounded-xl"
        >
          <Text className="text-white font-bold text-sm">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Dashboard Heading */}
      <View className="mt-6">
        <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>

        <Text className="text-gray-500 mt-1">
          Manage your application from here.
        </Text>
      </View>

      {/* Stats Cards */}
      <View className="flex-row flex-wrap justify-between gap-y-4 mt-5">
        {/* Total Users */}
        <View className="w-[48%] rounded-2xl bg-white p-4 shadow">
          <Text className="text-2xl font-bold text-gray-800">{users.totalUsers[0].totalUsers}</Text>
          <Text className="mt-1 text-sm text-gray-500">Total Users</Text>
        </View>

        {/* Total Orders */}
        <View className="w-[48%] rounded-2xl bg-white p-4 shadow">
          <Text className="text-2xl font-bold text-gray-800">{users.totalOrders[0].totalOrders}</Text>
          <Text className="mt-1 text-sm text-gray-500">Total Orders</Text>
        </View>

        {/* Pending Orders */}
        <View className="w-[48%] rounded-2xl bg-white p-4 shadow">
          <Text className="text-2xl font-bold text-gray-800">{users.totalOrders[0].totalOrders}</Text>

          <Text className="mt-1 text-sm text-gray-500">Pending Orders</Text>
        </View>

        {/* Revenue */}
        <View className="w-[48%] rounded-2xl bg-white p-4 shadow">
          <Text className="text-2xl font-bold text-gray-800">{users.revanue}</Text>
          <Text className="mt-1 text-sm text-gray-500">Revenue</Text>
        </View>
      </View>

      {/* Admin Actions */}
      <View className="mt-7">
        <Text className="text-xl font-bold text-gray-900 mb-4">Manage</Text>

        {/* Orders Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Order')}
          className="bg-[#403635] rounded-2xl p-5 flex-row items-center justify-between"
        >
          <View>
            <Text className="text-white text-lg font-bold">📦 Orders</Text>

            <Text className="text-gray-300 mt-1">
              View and manage customer orders
            </Text>
          </View>

          <Text className="text-white text-2xl">→</Text>
        </TouchableOpacity>
        <View className="items-center mt-8">
          <View className="items-center mt-8">
            <Text className="text-[#403635] text-2xl font-bold mt-8">
              Food Delivery
            </Text>

            <Text className="text-gray-800 text-base font-semibold mt-2">
              Delicious food, delivered with love ❤️
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
