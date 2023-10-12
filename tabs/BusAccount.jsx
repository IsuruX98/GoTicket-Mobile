import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BusAccount = () => {
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
});

export default BusAccount;
