import React from "react";
import {View, Text, StyleSheet} from "react-native";
import QRCode from "react-native-qrcode-svg";

const MyTicket = ({ userId }) => {
    // Generate the QR code data using the userId
    const qrCodeData = `https://facebook.com/rpyasiru/`;

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.text}>My Ticket</Text>
            {/* Render the QR code */}
            <QRCode value={qrCodeData} size={200} />
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
        fontSize: 24
    }
});

export default MyTicket;



