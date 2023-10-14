import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AddScheduleScreen = ({ navigation }) => {
  const [scheduleId, setScheduleId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [busId, setBusId] = useState("");
  const [routeName, setRouteName] = useState("");

  const handleAddSchedule = () => {
    const newSchedule = {
      scheduleId: scheduleId,
      startTime: startTime,
      endTime: endTime,
      date: date,
      busId: busId,
      routeName: routeName,
    };

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Schedule</Text>
      <TextInput
        style={styles.input}
        placeholder="Schedule ID"
        value={scheduleId}
        onChangeText={(text) => setScheduleId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time"
        value={startTime}
        onChangeText={(text) => setStartTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time"
        value={endTime}
        onChangeText={(text) => setEndTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bus ID"
        value={busId}
        onChangeText={(text) => setBusId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Route Name"
        value={routeName}
        onChangeText={(text) => setRouteName(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddSchedule}>
        <Text style={styles.buttonText}>Add Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 80,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#9744be",
    fontWeight: "900",
    fontSize: 40,
    paddingBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  addButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#9744be",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddScheduleScreen;
