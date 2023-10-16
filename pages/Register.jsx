import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "../apis/axios";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedType, setSelectedType] = useState("passenger");

  const userTypes = [
    { label: "Passenger", value: "passenger" },
    { label: "Inspector", value: "inspector" },
  ];

  const handleRegister = () => {
    const registrationData = {
      name: name,
      contactNumber: mobile,
      email: email,
      password: password,
      role: selectedType.charAt(0).toUpperCase() + selectedType.slice(1), // Capitalize the first letter
      uniqueField: "WP-1024",
    };

    // Make a POST request to the registration endpoint
    axios.post("user/signup", registrationData)
        .then(response => {
          // Registration successful, navigate to the appropriate screen
          if (selectedType === "passenger") {
            navigation.navigate("Login");
          } else if (selectedType === "inspector") {
            navigation.navigate("Login");
          }
        })
        .catch(error => {
          // Handle registration error, e.g., show an error message
          console.error("Registration failed:", error);
          // You can show an error message to the user here
        });
  };

  return (
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <RNPickerSelect
            placeholder={{
              label: "Select User Type",
              value: null,
            }}
            items={userTypes}
            onValueChange={(value) => setSelectedType(value)}
            style={pickerSelectStyles}
            value={selectedType}
        />
        <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            value={name}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
        />
        <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            onChangeText={(text) => setMobile(text)}
            value={mobile}
            keyboardType="phone-pad"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
        />
        <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signInText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    width: "100%",
    borderColor: "#333333",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  inputAndroid: {
    height: 40,
    width: "100%",
    borderColor: "#333333",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  heading: {
    fontWeight: "900",
    fontSize: 50,
    marginBottom: 50,
    color: "#9744be",
  },
  dropdownButton: {
    height: 40,
    width: "100%",
    borderColor: "#333333",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#333333",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: "#9744be",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  signInText: {
    marginTop: 20,
    color: "#333333",
    fontWeight: "bold",
  },
});

export default Register;
