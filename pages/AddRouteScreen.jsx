import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AddRouteScreen = ({ navigation }) => {
  const [routeName, setRouteName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");

  const handleAddRoute = () => {
    const newRoute = {
      routeName: routeName,
      start: start,
      end: end,
      price: parseFloat(price),
    };

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Route</Text>
      <TextInput
        style={styles.input}
        placeholder="Route Name"
        value={routeName}
        onChangeText={(text) => setRouteName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Start"
        value={start}
        onChangeText={(text) => setStart(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="End"
        value={end}
        onChangeText={(text) => setEnd(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddRoute}>
        <Text style={styles.buttonText}>Add Route</Text>
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

export default AddRouteScreen;
