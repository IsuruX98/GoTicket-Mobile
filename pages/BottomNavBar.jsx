import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../tabs/Home";
import InspectorScan from "../tabs/InspectorScan";
import BusAccount from "../tabs/BusAccount"; // Updated import for Bus Account tab
import Schedule from "../tabs/Schedule"; // New import for Schedule tab

const home = "Home";
const scan = "Scan QR";
const schedule = "Schedule"; // New tab name for Schedule
const busAccount = "Bus Account"; // Updated tab name for Bus Account

const Tab = createBottomTabNavigator();

const BottomNavBar = ({ navigation }) => {
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
                            iconName = focused ? "bus" : "bus-outline"; // Icon for Bus Account tab
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
                    options={{ headerShown: false }}
                >
                    {props => <InspectorScan {...props} navigation={navigation} />}
                </Tab.Screen>
                <Tab.Screen
                    name={schedule}
                    component={Schedule} // Assign Schedule component to the Schedule tab
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={busAccount}
                    component={BusAccount} // Assign BusAccount component to the Bus Account tab
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomNavBar;
