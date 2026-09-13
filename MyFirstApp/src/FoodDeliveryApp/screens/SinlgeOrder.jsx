import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import React, { useReducer } from 'react';
import { useNavigation } from "@react-navigation/native";

const SinlgeOrder = ({ route }) => {
    console.log(route);
    const navigation = useNavigation();
    const { food } = route.params;
    //*qnty reducer
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

    const [state, dispatch] = useReducer(reducer, { qty: 1 });
    const foodItem = {
        name: route.params.food.name,
        price: route.params.food.price * state.qty,
        quentity: state.qty
    };

    return (
        <View className="flex-1 bg-[#f7f7f7]">

            {/* TOP HEADER */}
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


            <ScrollView showsVerticalScrollIndicator={false}>

                {/* FOOD IMAGE */}
                <View className="items-center">
                    <Image
                        source={food.img}
                        className="w-[320px] h-[380px]"
                        resizeMode="contain"
                    />
                </View>


                {/* FOOD DETAILS */}
                <View className="px-6">

                    <Text className="text-3xl font-bold text-gray-800">
                        {food.name}
                    </Text>


                    {/* RATING */}
                    <View className="flex-row items-center mt-3">
                        <Text className="text-orange-400 text-2xl">
                            ★
                        </Text>

                        <Text className="text-gray-500 text-lg ml-2">
                            {food.rating} — 26 mins
                        </Text>
                    </View>


                    {/* DESCRIPTION */}
                    <Text className="text-gray-500 text-lg leading-8 mt-4">
                        The {food.name} is a classic fast food burger that packs
                        a punch of flavor in every bite. Made with a juicy beef
                        patty cooked to perfection, it's topped with melted
                        cheese, crispy lettuce, ripe tomato, and crunchy pickles.
                    </Text>

                    <View className="mt-5">
                        {/* QUANTITY */}
                        <View>

                            <Text className="text-gray-700 text-lg font-semibold mb-1">
                                Portion
                            </Text>

                            <View className="flex-row items-center gap-5">

                                {/* MINUS */}
                                <TouchableOpacity
                                    onPress={() => dispatch({ type: "dec" })}
                                    className="w-14 h-14 bg-red-500 rounded-2xl items-center justify-center"
                                >
                                    <Text className="text-white text-3xl font-bold">
                                        −
                                    </Text>
                                </TouchableOpacity>


                                {/* QTY */}
                                <Text className="text-2xl font-semibold text-gray-700">
                                    {state.qty}
                                </Text>


                                {/* PLUS */}
                                <TouchableOpacity
                                    onPress={() => dispatch({ type: "inc" })}
                                    className="w-14 h-14 bg-red-500 rounded-2xl items-center justify-center"
                                >
                                    <Text className="text-white text-3xl font-bold">
                                        +
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                        {/* amount and order btns */}
                        <View className="flex-row items-center justify-between px-0  mt-10 gap-x-5">

                            <View className="bg-red-500 w-36 h-20 rounded-[20px] items-center justify-center">
                                <Text className="text-white text-2xl font-bold">
                                    ₹{route.params.food.price * state.qty}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Customize", { name: foodItem.name, price: foodItem.price, quentity: foodItem.quentity, orderDetails: route })} className="bg-[#403635] h-20 flex-1  rounded-[20px] items-center justify-center"
                            >
                                <Text className="text-white text-xl font-bold uppercase">
                                    Order Now
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
};

export default SinlgeOrder;