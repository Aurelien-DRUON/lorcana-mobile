import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Set = ({ item }) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.touchableOpacity}
      onPress={() => router.push(`/(tabs)/collection/cards?id=${item.id}`)}
    >
      <Text style={styles.buttonText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Set;
