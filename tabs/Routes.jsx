import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const Routes = ({ navigation }) => {
  const [routes, setRoutes] = useState([
    { routeName: "EX 1", start: "Galle", end: "Makubura", price: 850.0 },
    { routeName: "EX 2", start: "Galle", end: "Makubura", price: 850.0 },
    { routeName: "EX 3", start: "Galle", end: "Makubura", price: 850.0 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleAddRoute = () => {
    navigation.navigate("AddRoute");
  };

  const handleDelete = (routeName) => {
    const updatedRoutes = routes.filter(
      (route) => route.routeName !== routeName
    );
    setRoutes(updatedRoutes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Route List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by routeName, start, end, or price"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddRoute}>
        <Text style={styles.buttonText}>Add Route</Text>
      </TouchableOpacity>
      <FlatList
        data={routes.filter(
          (item) =>
            item.routeName.includes(searchQuery) ||
            item.start.includes(searchQuery) ||
            item.end.includes(searchQuery) ||
            item.price.toString().includes(searchQuery)
        )}
        keyExtractor={(item) => item.routeName}
        renderItem={({ item }) => (
          <View style={styles.routeCard}>
            <View style={styles.routeInfo}>
              <Text style={styles.routeName}>Route Name: {item.routeName}</Text>
              <Text style={styles.start}>Start: {item.start}</Text>
              <Text style={styles.end}>End: {item.end}</Text>
              <Text style={styles.price}>Price: {item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() =>
                navigation.navigate("UpdateRoute", {
                  routeName: item.routeName,
                  start: item.start,
                  end: item.end,
                  price: item.price,
                })
              }
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.routeName)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    color: "#9744be",
    fontWeight: "900",
    fontSize: 40,
    paddingBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addButton: {
    height: 40,
    backgroundColor: "#9744be",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  routeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  start: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  end: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#FF4500",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 4,
  },
  viewButton: {
    backgroundColor: "#333333",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Routes;
