import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../tabs/Home";
import InspectorScan from "../tabs/InspectorScan";
import Profile from "../tabs/InspectorProfile"; // Updated import
// Removed import for About tab

const home = "Home";
const scan = "Scan QR";
const profile = "Profile"; // Updated tab name

const Tab = createBottomTabNavigator();

const BottomNavBar = ({navigation}) => {
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
                } else if (rn === profile) {
                  iconName = focused ? "person" : "person-outline"; // Icon for profile tab
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
              name={profile}
              component={Profile} // Updated component for profile tab
              options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default BottomNavBar;
