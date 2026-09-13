import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Profile() {
  return (
    <View className="flex-1 bg-[#F8F5F2]">
      {/* Header */}
      <View className="bg-[#403635] pt-14 pb-6 px-5 rounded-b-[30px]">
        <Text className="text-white text-3xl font-bold">My Profile</Text>

        <Text className="text-[#D8CCCA] mt-1">Welcome back 👋</Text>
      </View>

      {/* Profile Card */}
      {/* <View className="mx-5 -mt-26 pt-14 bg-white rounded-3xl px-6 py-7 shadow-lg"> */}
      <View className="mx-5 mt-8 pt-14 bg-white rounded-3xl px-6 py-7 shadow-lg">
        {/* <View className="mx-5 -mt-28 pt-14 bg-white rounded-3xl px-6 py-7 shadow-lg"> */}
        {/* <View className="mx-5 -mt-16 pt-14 bg-white rounded-3xl px-6 py-7 shadow-lg"> */}

        {/* Avatar */}
        <View className="items-center">
          <View className="w-28 h-28 rounded-full bg-[#F1E2DC] items-center justify-center border-4 border-white shadow">
            <Text className="text-[#403635] text-5xl font-bold">H</Text>
          </View>

          {/* Name */}
          <Text className="text-2xl font-bold text-[#403635] mt-4">
            Harsh Parmar
          </Text>

          {/* Email */}
          <Text className="text-gray-500 text-sm mt-1">harsh123@gmail.com</Text>
        </View>

        {/* Info Section */}
        <View className="mt-7">
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Account Information
          </Text>

          {/* Name */}
          <View className="flex-row items-center mt-4 bg-[#FAF7F5] rounded-2xl px-4 py-4">
            <View className="w-11 h-11 rounded-full bg-[#E9D9D3] items-center justify-center">
              <Text className="text-[#403635] text-lg">👤</Text>
            </View>

            <View className="ml-4">
              <Text className="text-gray-400 text-xs">Full Name</Text>

              <Text className="text-[#403635] text-base font-semibold mt-1">
                Harsh Parmar
              </Text>
            </View>
          </View>

          {/* Email */}
          <View className="flex-row items-center mt-3 bg-[#FAF7F5] rounded-2xl px-4 py-4">
            <View className="w-11 h-11 rounded-full bg-[#E9D9D3] items-center justify-center">
              <Text className="text-[#403635] text-lg">✉️</Text>
            </View>

            <View className="ml-4">
              <Text className="text-gray-400 text-xs">Email Address</Text>

              <Text className="text-[#403635] text-base font-semibold mt-1">
                harsh123@gmail.com
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Food Quote */}
      <View className="items-center mt-20 px-12">
        <Text className="text-[#403635] text-2xl font-bold text-center">
          Good food, Good mood ❤️
        </Text>

        <Text className="text-gray-800 text-lg text-center mt-3">
          Enjoy every bite of your favourite food. 😋
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
