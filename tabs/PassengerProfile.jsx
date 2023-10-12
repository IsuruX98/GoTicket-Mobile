import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const Avatar = require("../assets/User-avatar.svg.png");

const PassengerProfile = () => {
    return (
        <View style={styles.container}>

            <View>
                <Image source={Avatar} style={{ width: 100, height: 100 }} />
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.username}>Yasiru Deshan</Text>
                <Text style={styles.title}>Passenger</Text>
                <Text style={styles.email}>rpyasiru@gmail.com</Text>
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
