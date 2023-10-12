import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity ,FlatList} from "react-native";
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import ScheduleItem from "../components/ScheduleItem";

const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [scheduleData, setScheduleData] = useState([
        { scheduleId: "SD123", startTime: "08:00 AM", endTime: "10:00 AM", date: "05-08-23" },
        { scheduleId: "SD124", startTime: "10:30 AM", endTime: "12:30 PM", date: "12-10-23" },
        { scheduleId: "SD125", startTime: "01:00 PM", endTime: "03:00 PM", date: "12-10-23" },
        { scheduleId: "SD126", startTime: "03:30 PM", endTime: "05:30 PM", date: "05-06-23" },
        { scheduleId: "SD127", startTime: "06:00 PM", endTime: "08:00 PM", date: "05-07-23" },
        { scheduleId: "SD128", startTime: "08:30 PM", endTime: "10:30 PM", date: "05-03-23" },
        { scheduleId: "SD129", startTime: "11:00 PM", endTime: "01:00 AM", date: "12-10-23" },
        { scheduleId: "SD130", startTime: "01:30 AM", endTime: "03:30 AM", date: "12-10-23" },
    ]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const getFormattedDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${String(year).substr(-2)}`;
    };

    const [schedules, setSchedules] = useState(
        scheduleData.filter((item) => item.date === getFormattedDate(selectedDate))
    );



    const handleDayPress = (day) => {
        const selectedDate = new Date(day.dateString);
        setSelectedDate(selectedDate);
        setSchedules(scheduleData.filter((item) => item.date === getFormattedDate(selectedDate)));
        hideDatePicker();
    };

    const handleComplete = (scheduleId) => {
        const updatedSchedules = schedules.filter((schedule) => schedule.scheduleId !== scheduleId);
        setSchedules(updatedSchedules);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    return (
        <View style={styles.container}>
            {schedules.length === 0 ? (
                <Text style={styles.noScheduleText}>No schedules for selected date.</Text>
            ) : (
                <>
                    <Text style={styles.headerText}>Schedule for {getFormattedDate(selectedDate)}</Text>
                    <FlatList
                        style={styles.flatList}
                        data={schedules}
                        keyExtractor={(item) => item.scheduleId}
                        renderItem={({ item }) => (
                            <ScheduleItem schedule={item} onDelete={handleComplete} />
                        )}
                    />
                </>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={showDatePicker}>
                    <Text style={styles.buttonText}>Pick a Date</Text>
                </TouchableOpacity>
                <Modal
                    isVisible={isDatePickerVisible}
                    onBackdropPress={hideDatePicker}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                >
                    <View style={styles.modalContainer}>
                        <Calendar
                            current={selectedDate.toISOString().split('T')[0]}
                            minDate={new Date().toISOString().split('T')[0]} // Set minDate to the current date
                            onDayPress={(day) => handleDayPress(day)}
                            markedDates={{
                                [selectedDate.toISOString().split('T')[0]]: { selected: true, selectedColor: '#9744be' },
                            }}
                        />
                    </View>
                </Modal>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#9744be" }]}
                    onPress={() => setSchedules(scheduleData)}
                >
                    <Text style={styles.buttonText}>Refresh</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 80,
        backgroundColor: "#fff",
    },
    headerText: {
        color: "#9744be",
        fontWeight: "900",
        fontSize: 35,
        paddingBottom: 20,
        paddingLeft: 15,
    },
    flatList: {
        width: "100%",
        marginBottom: 20,
    },
    noScheduleText: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        color: "#555",
        marginTop: 20,
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#333",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: "48%",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
});

export default Schedule;
