import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import img1 from '../../../assets/FoodDelivery/image 1.png';
import img2 from '../../../assets/FoodDelivery/image 2.png';
import * as Keychain from 'react-native-keychain';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const move = setTimeout(async () => {
            navigation.replace("Login");
        }, 2000);

        return () => clearTimeout(move);
    }, [])

    return (
        <LinearGradient colors={['#fb8b95', '#ff1f35']} className="flex-1">
            <View className="flex-1">
                <View className="items-center absolute top-96 left-0 right-0">
                    <Text className="text-white text-5xl font-bold italic">FoodGo</Text>
                </View>

                <View className="flex-row absolute bottom-0 w-full">
                    <Image source={img2} />

                    <Image source={img1} className="absolute left-32 bottom-2" />
                </View>
            </View>
        </LinearGradient>
    );
};

export default SplashScreen;


