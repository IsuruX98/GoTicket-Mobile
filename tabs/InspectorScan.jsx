import React from "react";
import { View, Text } from "react-native";

const InspectorScan = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Inspector Scan Screen</Text>
    </View>
  );
};

export default InspectorScan;

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import QRCodeScanner from "react-native-qrcode-scanner";
//
// const InspectorScan = () => {
//     const onQRCodeRead = (e) => {
//         // Handle the scanned QR code data here
//         console.log("Scanned QR code data:", e.data);
//         // You can further process the scanned data as needed
//     };
//
//     return (
//         <View style={styles.container}>
//             <QRCodeScanner
//                 onRead={onQRCodeRead}
//                 cameraStyle={styles.cameraContainer}
//                 cameraProps={{ ratio: "1:1" }}
//                 topContent={
//                     <View style={styles.topContainer}>
//                         <Text style={styles.scanText}>Scan the QR code</Text>
//                     </View>
//                 }
//                 bottomContent={
//                     <View style={styles.bottomContainer}>
//                         <Text style={styles.scanText}>Place a QR code inside the frame to scan</Text>
//                     </View>
//                 }
//             />
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#000",
//     },
//     cameraContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     topContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 50,
//     },
//     bottomContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginBottom: 50,
//     },
//     scanText: {
//         fontSize: 18,
//         color: "#fff",
//     },
// });
//
// export default InspectorScan;
