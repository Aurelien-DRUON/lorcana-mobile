import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useGetCard } from "../../../hooks/useGetCard";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default function CardScreen() {
  const { setId, cardId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [card, setCard] = useState({});

  const handleCards = useCallback(async (setId: number, cardId: number) => {
    const response = await useGetCard(setId, cardId);
    if (response) {
      setCard(response);
      navigation.setOptions({ title: response.name });
    }
  }, []);

  useEffect(() => {
    handleCards(Number(setId), Number(cardId));
  }, [handleCards]);
  return (
    <View style={styles.container}>
      {/* @ts-expect-error Property 'image' does not exist on type '{}'. */}
      <Image source={{ uri: card.image }} style={{ width: 300, height: 450 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
