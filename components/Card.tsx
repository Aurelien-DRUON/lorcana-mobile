import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

const Card = ({ item, setId }) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() =>
        router.push(`/(tabs)/collection/card?setId=${setId}&cardId=${item.id}`)
      }
    >
      <Image source={{ uri: item.image }} style={{ width: 150, height: 225 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default Card;
