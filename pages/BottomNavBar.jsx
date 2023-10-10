import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../tabs/Home";
import InspectorScan from "../tabs/InspectorScan";
import About from "../tabs/About";
import Payment from "../tabs/Payment";

const home = "Home";
const scan = "Scan QR";
const about = "About";
const payments = "Payments";

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
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
            } else if (rn === about) {
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
            } else if (rn === payments) {
              iconName = focused ? "cash" : "cash-outline";
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
        <Tab.Screen
          name={scan}
          component={InspectorScan}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={about}
          component={About}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={payments}
          component={Payment}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavBar;
