import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const InspectorScan = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState('');

    console.log(scannedData)

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        try {
            // Attempt to parse the scanned data as JSON
            const parsedData = JSON.parse(data);
            setScannedData(parsedData);
            if (parsedData && Object.keys(parsedData).length === 2 && 'id' in parsedData && 'name' in parsedData) {
                // Navigate to GenerateTicket screen with scanned data
                navigation.navigate('GenerateTicket', { scannedData: parsedData });
            }
        } catch (error) {
            // Handle parsing error, if any
            // If parsing fails, set scanned data as is (non-JSON)
            setScannedData(data);
            // Directly navigate to GenerateTicket screen
            navigation.navigate('GenerateTicket', { scannedData: data });
        }
    };

    if (hasPermission === null) {
        return <Text style={styles.text}>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <View style={styles.scanResultContainer}>
                    {typeof scannedData === 'object' && (
                        <>
                            <Text style={styles.scanResultText}>Ticket Details</Text>
                            {Object.keys(scannedData).map(key => (
                                <Text key={key} style={styles.dataText}>
                                    {key}: {scannedData[key]}
                                </Text>
                            ))}
                        </>
                    )}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.touchableOpacityButton} onPress={() => setScanned(false)}>
                            <Text style={styles.buttonText}>Scan Again</Text>
                        </TouchableOpacity>
                        {typeof scannedData !== 'object' && (
                            <TouchableOpacity
                                style={styles.touchableOpacityButton}
                                onPress={() => {
                                    navigation.navigate('GenerateTicket', { scannedData });
                                }}
                            >
                                <Text style={styles.buttonText}>Generate Ticket</Text>
                            </TouchableOpacity>
                        )}
                    </View>
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
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    scanResultContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        marginTop: 20,
        width: '90%',
    },
    scanResultText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dataText: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
        gap:30
    },
    touchableOpacityButton: {
        backgroundColor: '#9744be',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default InspectorScan;
