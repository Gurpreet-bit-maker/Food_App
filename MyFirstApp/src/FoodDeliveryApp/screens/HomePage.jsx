import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { useState, useEffect } from "react"
import FilteredDataPage from "../components/Home/FilteredDataPage"
import { foodData } from "../../data.js"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import * as Keychain from "react-native-keychain";

const HomePage = () => {
    const navigation = useNavigation();

    const filterBtns = ["All", "Combos", "Sliders"]

    // const [filteredData, setFilteredData] = useState(foodData);
    const [search, setSearch] = useState("");
    const [activeBtn, setActiveBtn] = useState("All")
    //* filter search btn

    const result = useMemo(() => {
        return foodData.filter((item) => {

            // Category filter
            const categoryMatch =
                activeBtn === "All" || item.category === activeBtn;

            // Search filter
            const searchMatch =
                item.name.toLowerCase().includes(search.toLowerCase());

            return categoryMatch && searchMatch;
        });
    }, [activeBtn, search]);

    const logout = async () => {
        try {
            const token = await SecureStore.getItemAsync("accessToken");

            await axios.post(
                "http://10.0.2.2:8080/api/user/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        } finally {
            await SecureStore.deleteItemAsync("accessToken");
        }
    };

    return (
        <View className='p-5 gap-y-10'>
            {/* heading */}
            <View className="flex-row justify-between items-center px-5 pt-5 pb-4 ">

                <View>
                    <Text className="text-3xl font-extrabold text-gray-900 font-bold italic">
                        FoodGo
                    </Text>

                    <Text className="text-gray-500 mt-1 text-lg text-base">
                        Order your favourite food!
                    </Text>
                </View>

                <TouchableOpacity onPress={logout} className="bg-red-500 px-6 py-3 rounded-xl">
                    <Text className="text-white font-bold text-base">
                        Logout
                    </Text>
                </TouchableOpacity>

            </View>
            {/* search and filter */}
            <View className="flex-row items-center gap-3 px-5">
                <TextInput
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                    className="flex-1 border pl-5 h-16 rounded-2xl font-bold text-black tracking-wider text-lg"
                />
            </View>
            {/* filter btns */}
            <View className="flex-row justify-between px-5 mt-5">
                {filterBtns.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => setActiveBtn(item)}
                        className={`px-9 py-5 rounded-[28px] ${activeBtn === item ? "bg-red-500" : "bg-gray-200"
                            }`}
                    >
                        <Text
                            className={`text-xl ${activeBtn === item ? "text-white font-medium" : "text-gray-500"
                                }`}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* filtered data ui */}
            <View>
                <FilteredDataPage result={result} />
            </View>
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({})