import React from "react";
import { View, Text } from "react-native";
import Axios from "axios";
import QRCode from "react-native-qrcode-svg";

const MyTicket = () => {
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        // Fetch user data from the backend
        Axios.get("passenger/")
            .then((response) => {
                // Assuming your backend response is an object containing user data
                setProfileData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data: ", error);
            });
    }, []); // Empty dependency array ensures this effect runs once after the initial render

    // Generate the QR code data using the userId from profileData
    const qrCodeData = profileData.id;

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.text}>My QR</Text>
            {/* Render the QR code if qrCodeData is available */}
            {qrCodeData ? <QRCode value={qrCodeData} size={200} /> : null}
        </View>
    );
};

export default MyTicket;
