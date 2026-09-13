import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { OrderProvider } from "./src/FoodDeliveryApp/context/FetchData.js";
// Project food delivery
import HomePage from "./src/FoodDeliveryApp/screens/HomePage"
import SplashScreen from "./src/FoodDeliveryApp/screens/SplashScreen"
import SinlgeOrder from "./src/FoodDeliveryApp/screens/SinlgeOrder"
import Customize from "./src/FoodDeliveryApp/screens/Customize"
import MyOrders from "./src/FoodDeliveryApp/screens/MyOrders"
import Login from "./src/FoodDeliveryApp/screens/Login"

import Profile from "./src/FoodDeliveryApp/screens/Profile"
// admin
import AdminLogin from "./src/FoodDeliveryApp/screens/Admin/AdminLogin"
import Deshboard from "./src/FoodDeliveryApp/screens/Admin/Deshboard"
import Order from "./src/FoodDeliveryApp/screens/Admin/Orders"




const App = () => {
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator();

  const RootStack = () => {
    return (
      <Stack.Navigator initialRouteName="Splash" >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}
        />

        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }}
        />
        <Stack.Screen name="AdminDeshboard" component={Deshboard} options={{ headerShown: false }}
        />
        <Stack.Screen name="Order" component={Order} options={{ headerShown: false }}
        />


        <Stack.Screen name="Tabs" component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="FoodDetails" component={SinlgeOrder} options={{ headerShown: false }} />
        <Stack.Screen name="Customize" component={Customize} options={{ headerShown: false }} />
        {/* admin routes */}


      </Stack.Navigator>
    )
  }


  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "gray",
        }}
      >

        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="inbox" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <OrderProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </OrderProvider>

  )
}

export default App
