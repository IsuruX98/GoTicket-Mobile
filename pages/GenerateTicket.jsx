import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert ,TouchableWithoutFeedback, Keyboard} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';

const routeData = [
    { routeName: "EX 1", startStation: "Galle", endStation: "Makubura", price: 850.00 },
    { routeName: "EX 1-1", startStation: "Makubura", endStation: "Mathara", price: 1070.00 },
    { routeName: "EX 1-2", startStation: "Kaduwela", endStation: "Mathara", price: 1150.00 },
    { routeName: "EX 1-5/26", startStation: "Colombo", endStation: "Hakmana", price: 1380.00 },
    { routeName: "EX 1-7/26", startStation: "Colombo", endStation: "Middeniya", price: 1670.00 },
    { routeName: "EX 1-9/211", startStation: "Colombo", endStation: "Abilipitiya", price: 1660.00 },
    { routeName: "EX 1-10/60", startStation: "Colombo", endStation: "Akurassa", price: 1160.00 },
    { routeName: "EX 1-11/32", startStation: "Colombo", endStation: "Virakatiya", price: 1530.00 },
    { routeName: "EX 1-12/32", startStation: "Colombo", endStation: "Katharagama", price: 2080.00 },
    { routeName: "EX 1-13/353", startStation: "Colombo", endStation: "Deyyandara", price: 1470.00 },
    { routeName: "EX 1-14/60", startStation: "Colombo", endStation: "Deniyaya", price: 1500.00 },
    { routeName: "EX 1-16", startStation: "Colombo", endStation: "Alpitiya", price: 770.00 },
    { routeName: "EX 1-18", startStation: "Colombo", endStation: "Mathara", price: 1190.00 },
    // Add more routes as needed
];

const GenerateTicket = () => {
    const route = useRoute();
    const { scannedData } = route.params;
    const routeName = "EX 1-12/32";
    const busId = "ND123";
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [qrData, setQRData] = useState('');

    useEffect(() => {
        const foundRoute = routeData.find(route => route.routeName === routeName);
        if (!foundRoute) {
            Alert.alert('Error', 'Route not found.');
        } else {
            setSelectedRoute(foundRoute);
        }
    }, [scannedData]);

    useEffect(() => {
        const tickets = parseInt(numberOfTickets, 10);
        const ticketDetails = {
            name: 'John Doe',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            route: selectedRoute ? selectedRoute.routeName : '',
            startStation: selectedRoute ? selectedRoute.startStation : '',
            endStation: selectedRoute ? selectedRoute.endStation : '',
            price: selectedRoute ? selectedRoute.price * tickets : 0,
            numberOfTickets: tickets,
        };

        const jsonTicketDetails = JSON.stringify(ticketDetails);
        setQRData(jsonTicketDetails);
    }, [numberOfTickets, selectedRoute]);

    const handlePurchase = () => {
        const tickets = parseInt(numberOfTickets, 10);

        if (tickets <= 0) {
            Alert.alert('Error', 'Number of tickets must be a positive integer.');
            return;
        }

        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Generate Ticket</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Bus ID"
                    value={busId}
                    editable={false}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Route Name"
                    value={routeName}
                    editable={false}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Start Station"
                    value={selectedRoute ? selectedRoute.startStation : ''}
                    editable={false}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="End Station"
                    value={selectedRoute ? selectedRoute.endStation : ''}
                    editable={false}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Number of Tickets"
                    keyboardType="numeric"
                    value={numberOfTickets.toString()}
                    onChangeText={text => setNumberOfTickets(parseInt(text) || 0)}
                />
                <Text style={styles.priceText}>Ticket Price: Rs. {selectedRoute ? selectedRoute.price * numberOfTickets : 0}</Text>
                <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 35,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    headerText: {
        fontSize: 35,
        marginBottom: 40,
        fontWeight: '900',
    },
    inputField: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 8,
    },
    priceText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#333',
    },
    purchaseButton: {
        marginTop: 10,
        backgroundColor: '#9744be',
        padding: 12,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
    },
    qrCodeContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default GenerateTicket;
