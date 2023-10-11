import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';

const GenerateTicket = () => {
    const route = useRoute();
    const { scannedData } = route.params;
    const [startStation, setStartStation] = useState('');
    const [endStation, setEndStation] = useState('');
    const [ticketPrice, setTicketPrice] = useState(0);
    const [numberOfTickets, setNumberOfTickets] = useState('');
    const [qrData, setQRData] = useState('');

    useEffect(() => {
        // Set a base price for the ticket
        let price = 50;

        if (startStation === 'A' && endStation === 'B') {
            price += 10; // Increase price for StationA to StationB route
        }
        if (numberOfTickets >= 5) {
            price -= 5; // Apply a discount if more than 5 tickets are purchased
        }

        const calculatedPrice = price * numberOfTickets;
        setTicketPrice(calculatedPrice);
    }, [startStation, endStation, numberOfTickets, ticketPrice]);

    const handlePurchase = () => {
        // ... your existing purchase logic

        // Construct the data to be included in the QR code
        const ticketDetails = {
            name: 'John Doe', // Replace with the user's name
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            startStation,
            endStation,
            price: ticketPrice,
            numberOfTickets,
        };

        // Convert the ticket details object to a JSON string
        const jsonTicketDetails = JSON.stringify(ticketDetails);

        // Set the QR code data
        setQRData(jsonTicketDetails);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Generate Ticket</Text>
            <TextInput
                style={styles.inputField}
                placeholder="Enter Start Station"
                value={startStation}
                onChangeText={text => setStartStation(text)}
            />
            <TextInput
                style={styles.inputField}
                placeholder="Enter End Station"
                value={endStation}
                onChangeText={text => setEndStation(text)}
            />
            <TextInput
                style={styles.inputField}
                placeholder="Number of Tickets"
                keyboardType="numeric"
                value={numberOfTickets}
                onChangeText={text => setNumberOfTickets(text)}
            />
            <Text style={styles.priceText}>Ticket Price: Rs. {ticketPrice}</Text>
            <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
                <Text style={styles.buttonText}>Purchase Tickets</Text>
            </TouchableOpacity>
            {qrData && (
                <View style={styles.qrCodeContainer}>
                    <QRCode value={qrData} size={200} />
                </View>
            )}
        </View>
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
