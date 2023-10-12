import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ScheduleItem = ({ schedule, onDelete }) => {
    const { scheduleId, startTime, endTime, date } = schedule;

    return (
        <View style={styles.scheduleContainer}>
            <Ionicons name="bus" size={40} color="#333333" style={styles.busIcon} />
            <View style={styles.scheduleDetails}>
                <Text style={styles.scheduleText}>Schedule ID: {scheduleId}</Text>
                <Text style={styles.scheduleText}>Start Time: {startTime}</Text>
                <Text style={styles.scheduleText}>End Time: {endTime}</Text>
                <Text style={styles.scheduleText}>Date: {date}</Text>
            </View>
            <TouchableOpacity onPress={() => onDelete(scheduleId)} style={styles.completeButton}>
                <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    scheduleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    busIcon: {
        marginRight: 16,
    },
    scheduleDetails: {
        flex: 1,
    },
    scheduleText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    completeButton: {
        backgroundColor: "#333333",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    completeButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
    },
});

export default ScheduleItem;
