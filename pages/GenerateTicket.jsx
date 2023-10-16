import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "../apis/axios";

const routeData = [
  {
    routeName: "EX 1",
    startStation: "Galle",
    endStation: "Makubura",
    price: 850.0,
  },
  {
    routeName: "EX 1-1",
    startStation: "Makubura",
    endStation: "Mathara",
    price: 1070.0,
  },
  {
    routeName: "EX 1-2",
    startStation: "Kaduwela",
    endStation: "Mathara",
    price: 1150.0,
  },
  {
    routeName: "EX 1-5/26",
    startStation: "Colombo",
    endStation: "Hakmana",
    price: 1380.0,
  },
  {
    routeName: "EX 1-7/26",
    startStation: "Colombo",
    endStation: "Middeniya",
    price: 1670.0,
  },
  {
    routeName: "EX 1-9/211",
    startStation: "Colombo",
    endStation: "Abilipitiya",
    price: 1660.0,
  },
  {
    routeName: "EX 1-10/60",
    startStation: "Colombo",
    endStation: "Akurassa",
    price: 1160.0,
  },
  {
    routeName: "EX 1-11/32",
    startStation: "Colombo",
    endStation: "Virakatiya",
    price: 1530.0,
  },
  {
    routeName: "EX 1-12/32",
    startStation: "Colombo",
    endStation: "Katharagama",
    price: 2080.0,
  },
  {
    routeName: "EX 1-13/353",
    startStation: "Colombo",
    endStation: "Deyyandara",
    price: 1470.0,
  },
  {
    routeName: "EX 1-14/60",
    startStation: "Colombo",
    endStation: "Deniyaya",
    price: 1500.0,
  },
  {
    routeName: "EX 1-16",
    startStation: "Colombo",
    endStation: "Alpitiya",
    price: 770.0,
  },
  {
    routeName: "EX 1-18",
    startStation: "Colombo",
    endStation: "Mathara",
    price: 1190.0,
  },
];

const GenerateTicket = () => {
  const route = useRoute();
  const { scannedData } = route.params;
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [qrData, setQRData] = useState("");

  const [loggedInUser,setLoggedInUser] = useState({})
  const [loggedInUserEmail,setLoggedInUserEmail] = useState(null)
  let users = {}

  useEffect(() => {
    // Check the token in AsyncStorage when the component mounts
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('JWT');

        if (token) {
          const decodedToken = jwt_decode(token);
          const userEmail = String(decodedToken.sub); // Convert to string
          setLoggedInUserEmail(userEmail);

          if (userEmail){
            const response = await axios.get("bus");
            const data = response.data.body;

            const usersWithEmails = data
                .find(entry => entry.user && userEmail === entry.user.email)
            users = usersWithEmails
            setLoggedInUser(usersWithEmails)
          }

        } else {
          console.log('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error reading token from AsyncStorage:', error);
      }
    };

    checkToken(); // Call the function when the component mounts
  }, []);

  useEffect(() => {
    const foundRoute = loggedInUser.route?loggedInUser.route:{}
    if (!foundRoute) {
      Alert.alert("Error", "Route not found.");
    } else {
      setSelectedRoute(foundRoute);
      console.log(foundRoute)
    }
  }, [scannedData]);

  useEffect(() => {
    const tickets = parseInt(numberOfTickets, 10);
    const ticketDetails = {
      name: "John Doe",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      route: loggedInUser.route?loggedInUser.route.routeName:'',
      startStation: loggedInUser.route?loggedInUser.route.startPoint:'',
      endStation: loggedInUser.route?loggedInUser.route.endPoint:'',
      price: loggedInUser.route ? loggedInUser.route.ticketPrice : 1,
      numberOfTickets: tickets,
    };

    const jsonTicketDetails = JSON.stringify(ticketDetails);
    setQRData(jsonTicketDetails);
  }, [numberOfTickets, selectedRoute]);

  const handlePurchase = async () => {
    const tickets = parseInt(numberOfTickets, 10);

    if (tickets <= 0) {
      Alert.alert("Error", "Number of tickets must be a positive integer.");
      return;
    }

    const confirmed = await new Promise((resolve) => {
      Alert.alert(
          "Confirmation",
          `Are you sure you want to purchase ${tickets} ticket(s)?`,
          [
            {
              text: "Cancel",
              onPress: () => resolve(false),
              style: "cancel",
            },
            {
              text: "Confirm",
              onPress: () => resolve(true),
            },
          ],
          { cancelable: false }
      );
    });

    if (!confirmed) {
      return;
    }

    Keyboard.dismiss();

    let price = loggedInUser.route ? loggedInUser.route.ticketPrice : 1
    let userId = loggedInUser.route ? loggedInUser.user.id : ''
    let busNo = loggedInUser.busNo

    console.log(price)
    console.log(userId)
    console.log(busNo)

    const deductFromUser = async () => {
      try {
        const data = await axios.put(`balance/deduct/${userId}/${price*1}`);
      } catch (e) {
        console.log(e)
      }
    }
    await deductFromUser();

    const addForBus = async () => {
      try {
        const data = await axios.post(`bus/add/${busNo}/${price*1}`);
      } catch (e) {
        console.log(e)
      }
    }
    await addForBus();

    const saveTicket = async () => {
      try {
        const ticketData = {
          id: 3,
          qrData: qrData,
        };

        const response = await axios.post('tickets', ticketData);
        console.log('Ticket saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving ticket:', error);
      }
    };

    await saveTicket();

    Alert.alert("Success", "Tickets purchased successfully!");

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Generate Ticket</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Bus ID"
          value={loggedInUser.busNo}
          editable={false}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Route Name"
          value={loggedInUser.route?loggedInUser.route.routeName:''}
          editable={false}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Start Station"
          value={loggedInUser.route?loggedInUser.route.startPoint:''}
          editable={false}
        />
        <TextInput
          style={styles.inputField}
          placeholder="End Station"
          value={loggedInUser.route?loggedInUser.route.endPoint:''}
          editable={false}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Number of Tickets"
          keyboardType="numeric"
          value={numberOfTickets.toString()}
          onChangeText={(text) => setNumberOfTickets(parseInt(text) || 0)}
        />
        <Text style={styles.priceText}>
          Ticket Price: Rs.{" "}
          {loggedInUser.route?loggedInUser.route.ticketPrice * numberOfTickets : 0}
        </Text>
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handlePurchase}
        >
          <Text style={styles.buttonText}>Purchase Tickets</Text>
        </TouchableOpacity>
        {qrData && (
          <View style={styles.qrCodeContainer}>
            <QRCode value={qrData} size={200} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 35,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  headerText: {
    fontSize: 35,
    marginBottom: 40,
    fontWeight: "900",
  },
  inputField: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
  purchaseButton: {
    marginTop: 10,
    backgroundColor: "#9744be",
    padding: 12,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
  qrCodeContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default GenerateTicket;
