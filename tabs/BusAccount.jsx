import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BusAccount = ({navigation}) => {

    const handleLogout = async () => {
        try {
            // Remove the token from AsyncStorage
            await AsyncStorage.removeItem('JWT');
            // Navigate to the login screen or any other screen you want to show after logout
            navigation.navigate('Login');
        } catch (error) {
            // Handle AsyncStorage error, if any
            console.error('Error removing token from AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Bus Account</Text>
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle-outline" size={150} color="#555" />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Bus ID:</Text>
                <Text style={styles.value}>12345</Text>
                <Text style={styles.label}>Bus Number:</Text>
                <Text style={styles.value}>AB 123</Text>
                <Text style={styles.label}>Owner Name:</Text>
                <Text style={styles.value}>John Doe</Text>
                <Text style={styles.label}>Bus Route ID:</Text>
                <Text style={styles.value}>6789</Text>
                <Text style={styles.label}>Income:</Text>
                <Text style={styles.value}>Rs.6789.00</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.buttonTxt}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: 30,
        fontWeight: "900",
        color: "#9744be",
        marginBottom: 20,
    },
    profileContainer: {
        marginBottom: 20,
    },
    detailsContainer: {
        alignItems: "center",
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: "#555",
        marginBottom: 10,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: "#9744be",
        paddingHorizontal: 40,
        paddingVertical:15,
        borderRadius: 5,

    },
    buttonTxt:{
        fontWeight:"bold",
        color:"#fff"
    }
});

export default BusAccount;
