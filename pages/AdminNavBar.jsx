import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Schedules from "../tabs/Schedules";
import Routes from "../tabs/Routes";

const schedules = "Schedules";
const routes = "Routes";

const Tab = createBottomTabNavigator();

const AdminNavBar = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={schedules}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === schedules) {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === routes) {
              iconName = focused ? "map" : "map-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={schedules} options={{ headerShown: false }}>
          {(props) => <Schedules {...props} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name={routes} options={{ headerShown: false }}>
          {(props) => <Routes {...props} navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AdminNavBar;
