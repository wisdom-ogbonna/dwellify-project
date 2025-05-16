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
import mapStyle from "../assets/mapStyle"; 
import styles from "../style/MapStyle"; 


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

export default function Map() {
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

