import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native'



import img from "../../../assets/FoodDelivery/pngwing 12.png"
import Slider from '@react-native-community/slider';
import { useState, useReducer, useEffect, useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { toppings, sideOptions } from "../../data.js"
import Toppings from "../components/Toppings/Toppings.jsx"
import axios from "axios"
import { OrderContext } from "../context/FetchData.js"

const Customize = ({ route }) => {
    const { getOrders } = useContext(OrderContext);
    const { name, price } = route.params.orderDetails.params.food

    const navigation = useNavigation();
    const [spicy, setSpicy] = useState(70);
    const [finalOrder, setFinalOrder] = useState({
        toppings: [],
        toppingsPrice: 0,
        totalToppings: 0
    });
    const [orderPlaced, setOrderPlaced] = useState(false);

    // reducer
    function reducer(state, action) {
        switch (action.type) {

            case "inc":
                return {
                    qty: state.qty + 1
                };

            case "dec":
                return {
                    qty: state.qty > 0
                        ? state.qty - 1
                        : 0
                };

            default:
                throw Error('Unknown action: ' + action.type);
        }
    }
    const [state, dispatch] = useReducer(reducer, { qty: route.params.quentity });


    const clickMe = async () => {
        setFinalOrder(prev => ({
            ...prev,
            itemName: name,
            itemPrice: price * state.qty,
            quantity: state.qty,
            spicy: spicy,
            totalPrice: (price * state.qty) + prev.toppingsPrice
        }));

        setOrderPlaced(true);

    };

    useEffect(() => {
        console.log("Order:", finalOrder);
        const sendApi = async () => {
            try {
                if (orderPlaced == true) {
                    const response = await axios.post(
                        "http://10.0.2.2:8080/api/user/buy-order",
                        finalOrder
                    );
                    await getOrders()
                    console.log("Order Created:", response);
                }
            } catch (error) {
                console.log(error)
            }
        }
        sendApi()
    }, [orderPlaced]);

    const liveTotalPrice =
        price * state.qty + finalOrder.toppingsPrice;

    return (

        <View className="flex-1">

            <View className="flex-row justify-between items-center px-6 pt-10">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-12 h-12 items-center justify-center"
                >
                    <Text className="text-4xl text-gray-700">←</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 items-center justify-center">
                    <Text className="text-3xl">⌕</Text>
                </TouchableOpacity>
            </View>
            {/* top section */}
            <View className="flex-row gap-x-5 px-4 pt-8 ">

                {/* LEFT IMAGE */}
                <View className="w-[43%] mr-4 justify-start ">
                    <Image
                        source={img}
                        resizeMode="contain"
                        className="w-full h-[380px] "
                    />
                </View>

                {/* RIGHT SIDE */}
                <View className=" flex gap-y-12">

                    {/* TITLE */}
                    <Text className="text-[15px] leading-7 text-gray-600">
                        <Text className="font-bold text-gray-800">Customize</Text>
                        {" "}Your Burger{"\n"}to Your
                        Tastes, Ultimate{"\n"}
                        Experience
                    </Text>

                    {/* SPICY BAR */}
                    <View className="">
                        <Text className="text-xl font-semibold text-gray-700 mb-2">
                            Spicy
                        </Text>

                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            value={spicy}
                            onValueChange={setSpicy}
                            minimumTrackTintColor="#ef4444"
                            maximumTrackTintColor="#e5e7eb"
                            thumbTintColor="#ef4444"
                        />

                        <View className="flex-row justify-between">
                            <Text className="text-green-600 text-base">
                                Mild
                            </Text>

                            <Text className="text-red-500 text-base">
                                Hot
                            </Text>
                        </View>
                    </View>

                    {/* PORTION */}
                    <View className="">

                        <Text className="text-xl font-semibold text-gray-700 mb-4">
                            Portion
                        </Text>

                        <View className="flex-row items-center justify-between">

                            <TouchableOpacity
                                onPress={() => dispatch({ type: "dec" })}
                                className="w-14 h-14 bg-red-500 rounded-2xl items-center justify-center"
                            >
                                <Text className="text-white text-3xl font-bold">−</Text>
                            </TouchableOpacity>

                            <Text className="text-2xl font-semibold text-gray-700">
                                {state.qty}
                            </Text>

                            <TouchableOpacity
                                onPress={() => dispatch({ type: "inc" })}
                                className="w-14 h-14 bg-red-500 rounded-2xl items-center justify-center"
                            >
                                <Text className="text-white text-3xl font-bold">+</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    {/* TOPPINGS */}
                </View>
            </View>
            <View className="">
                <Toppings toppings={toppings} sideOptions={sideOptions} finalOrder={finalOrder} setFinalOrder={setFinalOrder} />
            </View>
            {/* order now btn */}
            <View className="flex-row items-center justify-around px-0  mt-5 gap-x-2">

                <View className="bg-red-500 w-32 h-20 rounded-[20px] items-center justify-center">
                    <Text className="text-white text-2xl font-bold">
                        ₹{liveTotalPrice}
                    </Text>
                </View>


                <TouchableOpacity

                    onPress={clickMe}
                    className="bg-[#403635] h-20 w-60 rounded-[20px] items-center justify-center"
                >
                    <Text className="text-white text-xl font-bold uppercase">
                        Order Now
                    </Text>
                </TouchableOpacity>
                {/* model */}
                <Modal
                    visible={orderPlaced}
                    transparent={true}
                    animationType="fade"
                >
                    <View className="flex-1 bg-black/50 items-center justify-center px-6">

                        <View className="bg-white w-full rounded-[25px] p-6">

                            <Text className="text-3xl text-green-500 text-center font-bold">
                                ✓
                            </Text>

                            <Text className="text-2xl font-bold text-center mt-3">
                                Order Submitted!
                            </Text>

                            <View className="mt-6 gap-3">

                                <Text className="text-lg font-bold">
                                    🍔 Item: {finalOrder.itemName}
                                </Text>

                                <Text className="text-lg">
                                    Price: ₹{finalOrder.itemPrice}
                                </Text>

                                <Text className="text-lg">
                                    Quantity: {finalOrder.quantity}
                                </Text>

                                <Text className="text-lg">
                                    🌶 Spicy: {finalOrder.spicy}%
                                </Text>

                                <Text className="text-lg">
                                    Total Toppings: {finalOrder.totalToppings}
                                </Text>

                                <Text className="text-lg">
                                    Toppings Price: ₹{finalOrder.toppingsPrice}
                                </Text>

                                {/* Toppings Names */}
                                <View>
                                    <Text className="text-lg font-bold">
                                        Selected Toppings:
                                    </Text>

                                    {finalOrder.toppings?.map((item) => (
                                        <Text
                                            key={item.id}
                                            className="text-gray-600 ml-3 mt-1"
                                        >
                                            • {item.name} - ₹{item.price}
                                        </Text>
                                    ))}
                                    <Text className="text-xl font-bold text-red-500 mt-3">
                                        Total Price: ₹{finalOrder.totalPrice}
                                    </Text>
                                </View>

                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    setOrderPlaced(false);
                                    navigation.navigate("Tabs");
                                }}
                                className="bg-[#403635] w-full py-4 rounded-xl mt-6 items-center"
                            >
                                <Text className="text-white text-lg font-bold">
                                    Done
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
            </View>
        </View>

    )
}

export default Customize

const styles = StyleSheet.create({})