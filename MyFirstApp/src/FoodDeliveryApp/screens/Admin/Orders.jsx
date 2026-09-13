import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { OrderContext } from "../../context/FetchData.js"
export default function Orders() {
  const { order } = useContext(OrderContext)
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
  console.log(order)
  return (
    <View className="flex-1 bg-gray-100 px-4 pt-12">
      <Text className="text-3xl font-bold text-[#403635] mb-5">Orders</Text>

      <FlatList
        data={order}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-5 mb-4 shadow">
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold">Order #{item._id}</Text>

              <Text className="text-green-600 font-bold">{item.orderStatus}</Text>
            </View>

            <Text className="text-gray-800 mt-4 font-semibold">
              👤
            </Text>

            {/* <Text className="text-gray-500 mt-1">📧 {item.totalPrice}</Text> */}

            <Text className="text-gray-700 mt-4">🍕 {item.itemName}</Text>

            <View className="flex-row justify-between items-center mt-5">
              <Text className="text-xl font-bold">₹{item.totalPrice}</Text>

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
