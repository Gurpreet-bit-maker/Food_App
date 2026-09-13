import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Profile() {
    return (
        <View>
            <View className="bg-[#403635] pt-14 pb-6 px-5 rounded-b-[30px]">
                <Text className="text-white text-3xl font-bold">
                    Profile
                </Text>

                <Text className="text-gray-300 mt-1">
                    ...
                </Text>
            </View>
            <Text>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({})