import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from "react-native";
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import ScheduleItem from "../components/ScheduleItem";
import axios from "../apis/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('JWT');

                if (token) {
                    const decodedToken = jwt_decode(token);
                    const userEmail = String(decodedToken.sub);
                    setLoggedInUserEmail(userEmail);

                    if (userEmail) {
                        const response = await axios.get("bus");
                        const data = response.data.body;
                        const usersWithEmails = data.find(entry => entry.user && userEmail === entry.user.email);
                        setLoggedInUser(usersWithEmails);
                    }
                } else {
                    console.log('No token found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error reading token from AsyncStorage:', error);
            }
        };

        checkToken();
    }, []);

    const convertDateFormat = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year.substr(2, 2)}`;
    };

    const fetchScheduleData = async (date = new Date()) => {
        setIsLoading(true);
        try {
            const response = await axios.get("schedule");
            const data = response.data.body;
            const formattedDate = convertDateFormat(date.toISOString().split('T')[0]);
            const filteredSchedules = data.filter(item => {
                const itemDate = convertDateFormat(item.date);
                return itemDate === formattedDate && item.bus.busNo === loggedInUser.busNo;
            });
            setSchedules(filteredSchedules);
        } catch (error) {
            console.error("Error fetching schedule data: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        fetchScheduleData();
    },[])

    const handleDayPress = (day) => {
        const selectedDate = new Date(day.dateString);
        setSelectedDate(selectedDate);
        fetchScheduleData(selectedDate);
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
            {isLoading ? (
                <ActivityIndicator size="large" color="#9744be" style={styles.loader} />
            ) : (
                schedules.length === 0 ? (
                    <Text style={styles.noScheduleText}>No schedules for selected date.</Text>
                ) : (
                    <>
                        <Text style={styles.headerText}>Schedule for {selectedDate.toDateString()}</Text>
                        <FlatList
                            style={styles.flatList}
                            data={schedules}
                            keyExtractor={(item) => item.scheduleId}
                            renderItem={({ item }) => (
                                <ScheduleItem schedule={item} onDelete={handleComplete} />
                            )}
                        />
                    </>
                )
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
                            minDate={new Date().toISOString().split('T')[0]}
                            onDayPress={(day) => handleDayPress(day)}
                            markedDates={{
                                [selectedDate.toISOString().split('T')[0]]: { selected: true, selectedColor: '#9744be' },
                            }}
                        />
                    </View>
                </Modal>
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
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        justifyContent: "center",
        width: "100%",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#333",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default Schedule;
