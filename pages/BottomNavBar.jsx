import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../tabs/Home";
import InspectorScan from "../tabs/InspectorScan";
import BusAccount from "../tabs/BusAccount";
import Schedule from "../tabs/Schedule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";

const home = "Home";
const scan = "Scan QR";
const schedule = "Schedule";
const busAccount = "Bus Account";

const Tab = createBottomTabNavigator();



const BottomNavBar = ({ navigation }) => {

  // useEffect(() => {
  //   // Check the token in AsyncStorage when the component mounts
  //   const checkToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('JWT');
  //       if (token) {
  //         console.log('Token found in AsyncStorage:', token);
  //         // If you want, you can also navigate the user based on the token here
  //         // For example, decode the token and navigate based on the user role
  //       } else {
  //         console.log('No token found in AsyncStorage');
  //       }
  //     } catch (error) {
  //       console.error('Error reading token from AsyncStorage:', error);
  //     }
  //   };
  //
  //   checkToken(); // Call the function when the component mounts
  // }, []);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={home}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === home) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === scan) {
              iconName = focused ? "qr-code" : "qr-code-outline";
            } else if (rn === schedule) {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (rn === busAccount) {
              iconName = focused ? "bus" : "bus-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name={home}
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen name={scan} options={{ headerShown: false }}>
          {(props) => <InspectorScan {...props} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name={schedule}
          component={Schedule}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={busAccount}
          options={{ headerShown: false }}>
          {(props) => <BusAccount {...props} navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavBar;
