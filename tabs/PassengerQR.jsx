import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Axios from "../apis/axios";

const PassengerQR = () => {

    const[profileData, setProfileData] = useState({});

    useEffect(() => {

        Axios.get("passenger/")
            .then((response) => {

                setProfileData(response.data);
            })
            .catch((error) => {

                console.error("Error fetching data from backend:", error);
            });
    }, []);

    const passengerInfo = {
        id : profileData.id,
        name : profileData.name
    }

    const jsonString = JSON.stringify(passengerInfo);

    // Generate the QR code data using the userId from profileData
    const qrCodeData = jsonString;
    console.log(profileData.id)

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.heading}>My QR</Text>
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
    heading: {
        fontSize: 30,
        fontWeight: "900",
        color: "#9744be",
        marginBottom: 20,
    },
});

export default PassengerQR;
