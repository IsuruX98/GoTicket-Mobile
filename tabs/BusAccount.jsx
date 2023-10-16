import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "../apis/axios";

const BusAccount = ({navigation}) => {

    const [loggedInUser,setLoggedInUser] = useState({})
    const [loggedInUserEmail,setLoggedInUserEmail] = useState(null)
    let users = {}

    useEffect(() => {
        // Check the token in AsyncStorage when the component mounts
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('JWT');

                if (token) {
                    const decodedToken = jwt_decode(token);
                    const userEmail = String(decodedToken.sub); // Convert to string
                    setLoggedInUserEmail(userEmail);

                    if (userEmail){
                        const response = await axios.get("bus");
                        const data = response.data.body;

                        const usersWithEmails = data
                            .find(entry => entry.user && userEmail === entry.user.email)
                        users = usersWithEmails
                        setLoggedInUser(usersWithEmails);
                    }

                } else {
                    console.log('No token found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error reading token from AsyncStorage:', error);
            }
        };

        checkToken(); // Call the function when the component mounts
    }, []);

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
            <Text style={styles.heading}>Profile</Text>
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle-outline" size={150} color="#555" />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Bus Number:</Text>
                <Text style={styles.value}>{loggedInUser.busNo}</Text>
                <Text style={styles.label}>Inspector Name:</Text>
                <Text style={styles.value}>{loggedInUser.user?loggedInUser.user.name:''}</Text>
                <Text style={styles.label}>Mobile:</Text>
                <Text style={styles.value}>{loggedInUserEmail}</Text>
                <Text style={styles.label}>Bus Route ID:</Text>
                <Text style={styles.value}>{loggedInUser.route?loggedInUser.route.routeName:''}</Text>
                <Text style={styles.label}>Income:</Text>
                <Text style={styles.value}>Rs.{loggedInUser.income}</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.buttonTxt}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );ticketPrice
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
