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
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: "darkslateblue",
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gold",
    shadowColor: "black",
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonText: {
    width: "100%",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Set;
