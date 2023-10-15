import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const Schedules = ({ navigation }) => {
  const [schedules, setSchedules] = useState([
    {
      scheduleId: "SD123",
      startTime: "08:00 AM",
      endTime: "10:00 AM",
      date: "05-08-23",
      busId: "B123",
      routeName: "EX 1",
    },
    {
      scheduleId: "SD124",
      startTime: "08:00 AM",
      endTime: "10:00 AM",
      date: "05-08-23",
      busId: "B123",
      routeName: "EX 1",
    },
    {
      scheduleId: "SD125",
      startTime: "08:00 AM",
      endTime: "10:00 AM",
      date: "05-08-23",
      busId: "B123",
      routeName: "EX 1",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleAddSchedule = () => {
    navigation.navigate("AddSchedule");
  };

  const handleDelete = (scheduleId) => {
    const updatedSchedules = schedules.filter(
      (schedule) => schedule.scheduleId !== scheduleId
    );
    setSchedules(updatedSchedules);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Schedule List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by scheduleId, busId, type, or routeName"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddSchedule}>
        <Text style={styles.buttonText}>Add Schedule</Text>
      </TouchableOpacity>
      <FlatList
        data={schedules.filter(
          (item) =>
            item.scheduleId.includes(searchQuery) ||
            item.busId.includes(searchQuery) ||
            item.routeName.includes(searchQuery)
        )}
        keyExtractor={(item) => item.scheduleId}
        renderItem={({ item }) => (
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleId}>
                Schedule ID: {item.scheduleId}
              </Text>
              <Text style={styles.time}>
                Time: {item.startTime} - {item.endTime}
              </Text>
              <Text style={styles.date}>Date: {item.date}</Text>
              <Text style={styles.busId}>Bus ID: {item.busId}</Text>
              <Text style={styles.routeName}>Route: {item.routeName}</Text>
            </View>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() =>
                navigation.navigate("UpdateSchedule", {
                  scheduleId: item.scheduleId,
                  startTime: item.startTime,
                  endTime: item.endTime,
                  date: item.date,
                  busId: item.busId,
                  routeName: item.routeName,
                })
              }
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.scheduleId)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    color: "#9744be",
    fontWeight: "900",
    fontSize: 40,
    paddingBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addButton: {
    height: 40,
    backgroundColor: "#9744be",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  busId: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  routeName: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: "#333333",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  deleteButton: {
    backgroundColor: "#FF4500",
    borderRadius: 8,
    marginLeft: 3,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Schedules;
