import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";

const Card = ({ item, setId }) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() =>
        router.push(`/(tabs)/collection/card?setId=${setId}&cardId=${item.id}`)
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
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
    backgroundColor: "gold",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 5,
  },
});

export default Card;
