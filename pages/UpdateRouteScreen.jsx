import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const UpdateRouteScreen = ({ route, navigation }) => {
  const {
    routeName: initialRouteName,
    start: initialStart,
    end: initialEnd,
    price: initialPrice,
  } = route.params;

  const [routeName, setRouteName] = useState(initialRouteName);
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [price, setPrice] = useState(initialPrice.toString());

  const handleUpdateRoute = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Update Route</Text>
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
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateRoute}>
        <Text style={styles.buttonText}>Update Route</Text>
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

export default UpdateRouteScreen;
