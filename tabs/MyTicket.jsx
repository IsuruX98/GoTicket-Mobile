import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Axios from "../apis/axios";
import QRCode from "react-native-qrcode-svg";
import {useFocusEffect} from "@react-navigation/native";

const Home = () => {

    const[ticketData, setTicketData] = useState("");

    const ticket = () => {
        Axios.get("tickets/last/")
            .then((response) => {

                setTicketData(response.data.qrData);
                console.log(response.data.qrData)
            })
            .catch((error) => {

                console.error("Error fetching data from backend:", error);
            });
    }


    useFocusEffect(
        React.useCallback(() => {

            ticket()

            return () => {

            };
        }, [])
    );






    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.heading}>My Ticket</Text>
            {ticketData ? <QRCode value={ticketData} size={200} /> : null}
        </View>
    );
};


const styles = StyleSheet.create({

    heading: {
        fontSize: 30,
        fontWeight: "900",
        color: "#9744be",
        marginBottom: 20,
    },
})

export default Home;



