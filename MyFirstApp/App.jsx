import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";

import { OrderProvider } from "./src/FoodDeliveryApp/context/FetchData.js";

// User screens
import HomePage from "./src/FoodDeliveryApp/screens/HomePage";
import SplashScreen from "./src/FoodDeliveryApp/screens/SplashScreen";
import SinlgeOrder from "./src/FoodDeliveryApp/screens/SinlgeOrder";
import Customize from "./src/FoodDeliveryApp/screens/Customize";
import MyOrders from "./src/FoodDeliveryApp/screens/MyOrders";
import Login from "./src/FoodDeliveryApp/screens/Login";
import Signup from "./src/FoodDeliveryApp/screens/Signup";
import Profile from "./src/FoodDeliveryApp/screens/Profile";

// Admin
import AdminLogin from "./src/FoodDeliveryApp/screens/Admin/AdminLogin";
import Deshboard from "./src/FoodDeliveryApp/screens/Admin/Deshboard";

// Protected Route
import ProtectedRoute from "./src/FoodDeliveryApp/navigation/ProtectedRoute";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MyTabs = () => {
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
};


const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">

      {/* Public Routes */}

      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AdminLogin"
        component={AdminLogin}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AdminDeshboard"
        component={Deshboard}
        options={{ headerShown: false }}
      />


      {/* Protected Routes */}

      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
      >
        {(props) => (
          <ProtectedRoute {...props}>
            <MyTabs />
          </ProtectedRoute>
        )}
      </Stack.Screen>


      <Stack.Screen
        name="FoodDetails"
        options={{ headerShown: false }}
      >
        {(props) => (
          <ProtectedRoute {...props}>
            <SinlgeOrder {...props} />
          </ProtectedRoute>
        )}
      </Stack.Screen>


      <Stack.Screen
        name="Customize"
        options={{ headerShown: false }}
      >
        {(props) => (
          <ProtectedRoute {...props}>
            <Customize {...props} />
          </ProtectedRoute>
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
};


const App = () => {
  return (
    <OrderProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </OrderProvider>
  );
};


export default App;