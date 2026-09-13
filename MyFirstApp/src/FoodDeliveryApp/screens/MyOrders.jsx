import { Text, View, FlatList } from "react-native";
import React, { useContext } from "react";
import { OrderContext } from "../context/FetchData.js";

const MyOrders = () => {
    const { order } = useContext(OrderContext);

    return (
        <View className="flex-1 bg-[#f8f8f8]">

            {/* Header */}
            <View className="bg-[#403635] pt-14 pb-6 px-5 rounded-b-[30px]">
                <Text className="text-white text-3xl font-bold">
                    My Orders
                </Text>

                <Text className="text-gray-300 mt-1">
                    Your delicious orders 🍔
                </Text>
            </View>

            <FlatList
                data={order}
                keyExtractor={(item) => item._id}
                contentContainerClassName="p-5 pb-10"
                ItemSeparatorComponent={() => (
                    <View className="h-4" />
                )}
                renderItem={({ item }) => (
                    <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">

                        {/* Top */}
                        <View className="flex-row justify-between items-center">

                            <View>
                                <Text className="text-xl font-bold text-gray-800">
                                    🍔 {item.itemName}
                                </Text>

                                <Text className="text-gray-400 text-sm mt-1">
                                    Order #{item._id.slice(-6)}
                                </Text>
                            </View>

                            <View className="bg-green-100 px-3 py-1 rounded-full">
                                <Text className="text-green-600 font-semibold">
                                    Ordered
                                </Text>
                            </View>

                        </View>

                        {/* Divider */}
                        <View className="h-[1px] bg-gray-100 my-4" />

                        {/* Details */}
                        <View className="flex-row justify-between">

                            <View>
                                <Text className="text-gray-400 text-sm">
                                    Price
                                </Text>

                                <Text className="text-gray-800 font-bold text-lg">
                                    ₹{item.itemPrice}
                                </Text>
                            </View>

                            <View>
                                <Text className="text-gray-400 text-sm">
                                    Quantity
                                </Text>

                                <Text className="text-gray-800 font-bold text-lg">
                                    {item.quantity}
                                </Text>
                            </View>

                            <View>
                                <Text className="text-gray-400 text-sm">
                                    Spicy
                                </Text>

                                <Text className="text-gray-800 font-bold text-lg">
                                    🌶 {item.spicy}%
                                </Text>
                            </View>

                        </View>

                        {/* Total */}
                        <View className="bg-red-50 rounded-2xl px-4 py-3 mt-5 flex-row justify-between items-center">

                            <Text className="text-gray-600 font-semibold">
                                Total Amount
                            </Text>

                            <Text className="text-red-500 text-xl font-bold">
                                ₹{item.totalPrice}
                            </Text>

                        </View>

                    </View>
                )}

                ListEmptyComponent={
                    <View className="items-center mt-24">
                        <Text className="text-6xl">🍔</Text>

                        <Text className="text-xl font-bold text-gray-700 mt-4">
                            No Orders Yet
                        </Text>

                        <Text className="text-gray-400 mt-2">
                            Your orders will appear here
                        </Text>
                    </View>
                }
            />

        </View>
    );
};

export default MyOrders;