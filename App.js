import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BottomNavBar from "./pages/BottomNavBar";
import PassengerNav from "./pages/PassengerNav";
import GenerateTicket from "./pages/GenerateTicket";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{headerShown: false}}
                />
                <Stack.Screen name="GoTicket" component={BottomNavBar} options={{headerShown: false}}/>
                <Stack.Screen name="PassengerNav" component={PassengerNav}/>
                <Stack.Screen
                    name="GenerateTicket"
                    component={GenerateTicket}
                    options={({ navigation }) => ({
                        headerShown: false,
                        screenProps: { navigation }, // Pass navigation as a screen prop
                    })}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
