import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'

import React, { useState } from 'react'

const Toppings = ({
    toppings,
    sideOptions,
    finalOrder,
    setFinalOrder
}) => {

    const [activeBtn, setActiveBtn] = useState([]);
    //* toping func
    const addToping = (item) => {
        setActiveBtn(prev =>
            prev.includes(item.id)
                ? prev.filter(id => id !== item.id)
                : [...prev, item.id]
        );

        setFinalOrder(prev => {
            const alreadyAdded = prev.toppings.some(
                topping => topping.id === item.id
            );

            const updatedToppings = alreadyAdded
                ? prev.toppings.filter(topping => topping.id !== item.id)
                : [...prev.toppings, item];

            const toppingsPrice = updatedToppings.reduce(
                (total, topping) => total + topping.price,
                0
            );

            return {
                ...prev,
                toppings: updatedToppings,
                toppingsPrice: toppingsPrice,
                totalToppings: updatedToppings.length
            };
        });
    };
    //* sideop func

    const addSideOption = (item) => {
        setActiveBtn(prev =>
            prev.includes(item.id)
                ? prev.filter(id => id !== item.id)
                : [...prev, item.id]
        );

        setFinalOrder(prev => {
            const alreadyAdded = prev.sideOptions?.some(
                side => side.id === item.id
            );

            const updatedSideOptions = alreadyAdded
                ? prev.sideOptions.filter(side => side.id !== item.id)
                : [...(prev.sideOptions || []), item];

            const sideOptionsPrice = updatedSideOptions.reduce(
                (total, side) => total + side.price,
                0
            );

            return {
                ...prev,
                sideOptions: updatedSideOptions,
                sideOptionsPrice: sideOptionsPrice,
                totalSideOptions: updatedSideOptions.length
            };
        });
    };

    return (
        <View className="p-3">

            {/* Toppings */}
            <Text className="text-xl font-bold text-zinc-700">
                Toppings
            </Text>

            <FlatList
                data={toppings}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-5 mt-3"
                keyExtractor={(item) => item.id.toString()}

                renderItem={({ item }) => (

                    <View className="w-24 h-28 bg-[#403735] rounded-[18px] overflow-hidden shadow-lg">

                        <View className="h-[60px] bg-[#F7F7F7] rounded-[18px] items-center justify-center">

                            <Image
                                source={item.image}
                                className="w-18 h-14"
                                resizeMode="contain"
                            />

                        </View>


                        <View className="flex-1 flex-row items-center justify-between px-2">

                            <Text className="text-white text-sm">
                                {item.name}
                            </Text>


                            <TouchableOpacity
                                onPress={() => addToping(item)}
                                className="w-6 h-6 rounded-full items-center justify-center"
                            >

                                {activeBtn.includes(item.id) ? (

                                    <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center">

                                        <Text className="text-white text-base font-bold">
                                            ✓
                                        </Text>

                                    </View>

                                ) : (

                                    <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center">

                                        <Text className="text-white text-base font-bold">
                                            +
                                        </Text>

                                    </View>

                                )}

                            </TouchableOpacity>

                        </View>

                    </View>
                )}
            />


            {/* Side Options */}
            <Text className="text-xl font-bold text-zinc-700 mt-5">
                Side options
            </Text>


            <FlatList
                data={sideOptions}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-5 mt-3"
                keyExtractor={(item) => item.id.toString()}

                renderItem={({ item }) => (

                    <View className="w-24 h-28 bg-[#403735] rounded-[18px] overflow-hidden shadow-lg">

                        <View className="h-[60px] bg-[#F7F7F7] rounded-[18px] items-center justify-center">

                            <Image
                                source={item.image}
                                className="w-18 h-14"
                                resizeMode="contain"
                            />

                        </View>


                        <View className="flex-1 flex-row items-center justify-between px-2">

                            <Text className="text-white text-sm">
                                {item.name}
                            </Text>


                            <TouchableOpacity
                                onPress={() => addSideOption(item)}
                                className="w-6 h-6 rounded-full items-center justify-center"
                            >

                                {activeBtn.includes(item.id) ? (

                                    <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center">

                                        <Text className="text-white text-base font-bold">
                                            ✓
                                        </Text>

                                    </View>

                                ) : (

                                    <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center">

                                        <Text className="text-white text-base font-bold">
                                            +
                                        </Text>

                                    </View>

                                )}

                            </TouchableOpacity>

                        </View>

                    </View>
                )}
            />

        </View>
    )
}

export default Toppings

const styles = StyleSheet.create({})