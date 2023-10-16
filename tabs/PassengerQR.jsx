import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Axios from "axios";

const PassengerQR = () => {
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        // Fetch user data from the backend
        Axios.get("http://localhost:8090/passenger/")
            .then((response) => {
                // Assuming your backend response is an object containing user data
                setProfileData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data: ", error);
            });
    }, []); // Empty dependency array ensures this effect runs once after the initial render

    // Generate the QR code data using the userId from profileData
    const qrCodeData = profileData.id;

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.text}>My QR</Text>
            {/* Render the QR code if qrCodeData is available */}
            {qrCodeData ? <QRCode value={qrCodeData} size={200} /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        marginBottom: 40,
        fontSize: 24,
    },
});

export default PassengerQR;
