import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const Avatar = require("../assets/User-avatar.svg.png");
import Axios from "../apis/axios";

const PassengerProfile = () => {

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
});

export default PassengerProfile;
