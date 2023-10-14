import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const UpdateScheduleScreen = ({ route, navigation }) => {
  const {
    scheduleId: initialScheduleId,
    startTime: initialStartTime,
    endTime: initialEndTime,
    date: initialDate,
    busId: initialBusId,
    routeName: initialRouteName,
  } = route.params;

  const [scheduleId, setScheduleId] = useState(initialScheduleId);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [date, setDate] = useState(initialDate);
  const [busId, setBusId] = useState(initialBusId);
  const [routeName, setRouteName] = useState(initialRouteName);

  const handleUpdateSchedule = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Update Schedule</Text>
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
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateSchedule}
      >
        <Text style={styles.buttonText}>Update Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  headerText: {
    color: "#9744be",
    fontWeight: "900",
    fontSize: 40,
    paddingBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  updateButton: {
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

export default UpdateScheduleScreen;
