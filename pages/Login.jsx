import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "../apis/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Make a POST request to the login endpoint with email and password
    axios.post("user/login", {
      email: email,
      password: password
    })
        .then(async response => {
          // Save the token to AsyncStorage
          await AsyncStorage.setItem('JWT', response.data.token);

          // Decode the token and log its contents
          const decodedToken = jwt_decode(response.data.token);
          console.log("Decoded Token:", decodedToken);

            const userRole = decodedToken.role;

            // Navigate based on user role
            if (userRole === "Inspector") {
                navigation.navigate("GoTicket");
            } else if(userRole === "Passenger"){
                navigation.navigate("PassengerNav");
            }
        })
        .catch(error => {
          Alert.alert(
              "Invalid Credentials",
              "Please enter correct email and password.",
              [{ text: "OK" }]
          );
        });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  logo: {
    width: 300,
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
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
  },
  loginButton: {
    marginTop: 10,
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
  signupText: {
    marginTop: 20,
    color: "#333333",
    fontWeight: "bold",
  },
});

export default Login;
