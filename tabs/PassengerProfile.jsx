import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
const Avatar = require("../assets/User-avatar.svg.png");
import Axios from "../apis/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const PassengerProfile = ({navigation}) => {

    const[profileData, setProfileData] = useState({});

    useEffect(() => {

        Axios.get("passenger/")
            .then((response) => {
                console.log(response.data)
                setProfileData(response.data);
            })
            .catch((error) => {

                console.error("Error fetching data from backend:", error);
            });
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

            <View>
                <Image source={Avatar} style={{ width: 100, height: 100 }} />
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.username}>{profileData.name}</Text>
                <Text style={styles.title}>{profileData.role}</Text>
                <Text style={styles.email}>{profileData.email}</Text>
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.buttonTxt}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,

    },
    profileInfo: {
        alignItems: "center",
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 24

    },
    title: {
        fontSize: 16,
        color: "gray",
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
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

export default PassengerProfile;
