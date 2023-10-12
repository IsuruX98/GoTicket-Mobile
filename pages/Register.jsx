import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('passenger');

    const userTypes = [
        { label: 'Passenger', value: 'passenger' },
        { label: 'Inspector', value: 'inspector' }
    ];

    const handleRegister = () => {
        // Implement your registration logic here
        // For example, you can use Firebase authentication

        // After successful registration, navigate to the appropriate screen based on selectedType
        if (selectedType === 'passenger') {
            // Navigate to Passenger Dashboard or Home screen
            navigation.navigate('PassengerDashboard');
        } else if (selectedType === 'inspector') {
            // Navigate to Inspector Dashboard or Home screen
            navigation.navigate('InspectorDashboard');
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const selectUserType = (type) => {
        setSelectedType(type);
        toggleModal();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Register</Text>
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
                <Text>{selectedType === 'passenger' ? 'Passenger' : 'Inspector'}</Text>
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <FlatList
                        data={userTypes}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => selectUserType(item.value)}
                            >
                                <Text>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={text => setName(text)}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                onChangeText={text => setMobile(text)}
                value={mobile}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={text => setConfirmPassword(text)}
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
        color: "#9744be"
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
