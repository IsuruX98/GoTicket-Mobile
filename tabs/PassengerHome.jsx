import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
const Bus = require("../assets/bus1.jpg");
const Avatar = require("../assets/avatar2.png");

const PassengerHome = () => {
    const userName = "Yasiru Deshan"; // Replace with user's name
    const accountBalance = 100; // Replace with user's account balance

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headTextGroup}>
                    <Text style={styles.greeting}>Hello</Text>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.quote}>Enjoy the ride and relax!</Text>
                </View>
                <View>
                    <Image source={Avatar} style={{ width: 100, height: 100 }} />
                </View>
            </View>

           <View style={styles.imageStyles}>
               <Image source={Bus} style={styles.busImage} />
           </View>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Account Balance: ${accountBalance}</Text>
                <TouchableOpacity style={styles.rechargeButton}>
                    <Text style={styles.buttonText}>Recharge Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,


    },
    greeting: {
        color:"#9744be",
        fontSize: 28,
        fontWeight:"bold"
    },
    userName:{
        color:"#9744be",
        fontSize:28
    },
    header:{
        paddingTop:84,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },

    quote: {
        fontSize: 18,
        fontWeight:"100"
    },
    headTextGroup:{
        display:"flex",

    },
    busImage: {
        width: 300,
        height: 200,
        resizeMode: "contain",
        marginBottom: 20,
    },
    imageStyles:{
        alignItems:"center",
        paddingTop: 36
    },

    balanceContainer: {
        alignItems: "center",
    },
    balanceText: {
        fontSize: 18,
        marginBottom: 10,
    },
    rechargeButton: {
        backgroundColor: "#9744be",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width:'100%',

    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign:'center'
    },
});

export default PassengerHome;
