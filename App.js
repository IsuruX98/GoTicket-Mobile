import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BottomNavBar from "./pages/BottomNavBar";
import Passenger from "./pages/Passenger";
import header from "@react-navigation/stack/src/views/Header/Header";

import GenerateTicket from "./pages/GenerateTicket";
import AdminNavBar from "./pages/AdminNavBar";
import Routes from "./tabs/Routes";
import AddRouteScreen from "./pages/AddRouteScreen";
import Schedules from "./tabs/Schedules";
import AddScheduleScreen from "./pages/AddScheduleScreen";
import UpdateRouteScreen from "./pages/UpdateRouteScreen";
import UpdateScheduleScreen from "./pages/UpdateScheduleScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoTicket"
          component={BottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PassengerNav"
          component={Passenger}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GenerateTicket"
          component={GenerateTicket}
          options={({ navigation }) => ({
            headerShown: false,
            screenProps: { navigation },
          })}
        />
        <Stack.Screen name="Routes" component={Routes} />
        <Stack.Screen
          name="AddRoute"
          component={AddRouteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Schedules" component={Schedules} />
        <Stack.Screen
          name="AddSchedule"
          component={AddScheduleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateRoute"
          component={UpdateRouteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateSchedule"
          component={UpdateScheduleScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
