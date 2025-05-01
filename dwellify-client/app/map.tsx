import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import mapStyle from "../assets/mapStyle"; // Ensure this exists

const mockAgents = [
  {
    id: "1",
    name: "Agent John",
    latitude: 6.5249,
    longitude: 3.3797,
    photo: { uri: "https://randomuser.me/api/portraits/men/32.jpg" },
  },
  {
    id: "2",
    name: "Agent Sarah",
    latitude: 6.5255,
    longitude: 3.3788,
    photo: { uri: "https://randomuser.me/api/portraits/women/44.jpg" },
  },
];

export default function App() {
  const [region] = useState({
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [currentAgentIndex, setCurrentAgentIndex] = useState(null); // Start with no agent shown
  const mapRef = useRef(null);

  const findNextAgent = () => {
    const nextIndex =
      currentAgentIndex === null
        ? 0
        : (currentAgentIndex + 1) % mockAgents.length;
    setCurrentAgentIndex(nextIndex);
    const agent = mockAgents[nextIndex];

    mapRef.current?.animateToRegion(
      {
        latitude: agent.latitude,
        longitude: agent.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏡 Dwellify Dashboard</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search agents, areas..."
          style={styles.searchInput}
        />
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {currentAgentIndex !== null && (
          <Marker
            key={mockAgents[currentAgentIndex].id}
            coordinate={{
              latitude: mockAgents[currentAgentIndex].latitude,
              longitude: mockAgents[currentAgentIndex].longitude,
            }}
            title={mockAgents[currentAgentIndex].name}
          >
            <View style={styles.customMarker}>
              <Image
                source={mockAgents[currentAgentIndex].photo}
                style={styles.markerImage}
              />
            </View>
          </Marker>
        )}
      </MapView>

      {/* Agent Info Card */}
      {currentAgentIndex !== null && (
        <View style={styles.agentList}>
          <FlatList
            horizontal
            data={[mockAgents[currentAgentIndex]]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.agentCard}>
                <Image source={item.photo} style={styles.agentImage} />
                <Text style={styles.agentName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      )}

      {/* Find Agent Button */}
      <View style={styles.footerButtonWrapper}>
        <TouchableOpacity style={styles.findButton} onPress={findNextAgent}>
          <Text style={styles.findButtonText}>Find Agent Near You</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 10,
  },
  filterButton: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 10,
  },
  searchBar: {
    position: "absolute",
    top: 110,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  agentList: {
    position: "absolute",
    bottom: 100,
    paddingLeft: 20,
  },
  agentCard: {
    backgroundColor: "#fff",
    marginRight: 15,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: 120,
  },
  agentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  agentName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  customMarker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 2,
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  footerButtonWrapper: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  findButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  findButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
});
