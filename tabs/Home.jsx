import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import hero from "../assets/businspector.png";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Simplifying</Text>
        <Text style={styles.subHeader}>Ticket Inspections</Text>
        <Text style={styles.description}>
          Effortless Ticket Verification for Seamless Commutes
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={hero} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 90,
    justifyContent: "space-around",
  },
  textContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    fontSize: 50,
    fontWeight: "900",
  },
  subHeader: {
    fontSize: 30,
    fontWeight: "900",
    color: "#9744be",
  },
  description: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9744be",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 90,
  },
  image: {
    width: 650,
    height: "100%",
    borderRadius: 20,
  },
});

export default Home;
