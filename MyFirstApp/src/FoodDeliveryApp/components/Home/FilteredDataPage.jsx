import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
const FilteredDataPage = ({ result }) => {

  
  console.log(result);
  const navigation = useNavigation()
  return (
    <View className="">
      <FlatList
        data={result}
        numColumns={2}
        contentContainerClassName="px-4 pt-4 pb-10"
        columnWrapperClassName="justify-between"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("FoodDetails", { food: item })}
            className="w-[48%] bg-white rounded-[30px] mb-5 overflow-hidden shadow-lg"
          >

            {/* Image */}
            <View className="items-center pt-5">
              <Image
                source={item.img}
                className="w-36 h-36"
                resizeMode="contain"
              />
            </View>

            {/* Details */}
            <View className="px-5 pb-5">
              <Text
                className="text-xl font-bold text-gray-700"
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text className="text-lg text-gray-600 mt-1">
                {item.category}
              </Text>

              {/* Rating + Heart */}
              <View className="flex-row justify-between items-center mt-4">
                <Text className="text-lg font-semibold text-gray-700">
                  ⭐ {item.rating}
                </Text>

                <Text className="text-3xl text-gray-600">
                  ♡
                </Text>
              </View>
            </View>

          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-2xl font-bold text-gray-500">
              No Food Found 🍔
            </Text>
          </View>
        }
      />
    </View>
  )
}

export default FilteredDataPage

const styles = StyleSheet.create({})