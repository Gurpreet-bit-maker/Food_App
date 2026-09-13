import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

export default function Orders() {
  const orders = [
    {
      id: '1024',
      customer: 'Harsh Parmar',
      email: 'harsh@gmail.com',
      items: 'Pizza × 2, Burger × 1',
      total: 499,
      status: 'Paid',
    },
    {
      id: '1025',
      customer: 'Rahul',
      email: 'rahul@gmail.com',
      items: 'Burger × 2',
      total: 299,
      status: 'Pending',
    },
    {
      id: '1026',
      customer: 'Priya Sharma',
      email: 'priya@gmail.com',
      items: 'Pizza × 1, Cold Drink × 2',
      total: 449,
      status: 'Delivered',
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-12">
      <Text className="text-3xl font-bold text-[#403635] mb-5">Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-5 mb-4 shadow">
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold">Order #{item.id}</Text>

              <Text className="text-green-600 font-bold">{item.status}</Text>
            </View>

            <Text className="text-gray-800 mt-4 font-semibold">
              👤 {item.customer}
            </Text>

            <Text className="text-gray-500 mt-1">📧 {item.email}</Text>

            <Text className="text-gray-700 mt-4">🍕 {item.items}</Text>

            <View className="flex-row justify-between items-center mt-5">
              <Text className="text-xl font-bold">₹{item.total}</Text>

              <TouchableOpacity className="bg-[#403635] px-4 py-2 rounded-xl">
                <Text className="text-white font-semibold">View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
