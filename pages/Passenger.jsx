import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Profile from "../tabs/PassengerProfile";
import MyQR from "../tabs/PassengerQR";
import PassengerHome from "../tabs/PassengerHome";
import MyTicket from "../tabs/MyTicket";

const home = "Home";
const profile = "Profile";
const myQR = "My QR";
const myTicket = "My Ticket";

const Tab = createBottomTabNavigator();

const Passenger = () => {
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
                        } else if (rn === profile) {
                            iconName = focused ? "person" : "person-outline";
                        } else if (rn === myQR) {
                            iconName = focused ? "qr-code" : "qr-code-outline";
                        } else if (rn === myTicket) {
                            iconName = focused ? "receipt" : "receipt-outline"; //not working
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: "blue", // Change the active tab icon color here
                    inactiveTintColor: "gray", // Change the inactive tab icon color here
                }}
            >
                <Tab.Screen
                    name={home}
                    component={PassengerHome}
                    options={{ title: "Home", headerShown: false }} // Hide the header for this screen
                />

                <Tab.Screen
                    name={myQR}
                    component={MyQR}
                    options={{ title: "My QR", headerShown: false }} // Hide the header for this screen
                />

                {/* My Ticket Screen */}
                <Tab.Screen
                    name={myTicket}
                    component={MyTicket}
                    options={{ title: "My Ticket", headerShown: false }} // Hide the header for this screen
                />

                <Tab.Screen
                    name={profile}
                    component={Profile}
                    options={{ title: "Profile", headerShown: false }} // Hide the header for this screen
                />


            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Passenger;
