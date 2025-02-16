import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Image, Button, View, Text } from "react-native";
import { useGetCard } from "../../../hooks/useGetCard";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { usePostOwned } from "../../../hooks/usePostOwned";
import { useGetAccountCard } from "../../../hooks/useGetAccountCards";

export default function CardScreen() {
  const { setId, cardId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [card, setCard] = useState<{
    image?: string;
    name?: string;
  }>({});
  const [normal, setNormal] = useState<number>(0);
  const [foil, setFoil] = useState<number>(0);

  const handleCards = useCallback(async (setId: number, cardId: number) => {
    const response = await useGetCard(setId, cardId);
    if (response) {
      setCard(response);
      navigation.setOptions({ title: response.name });
    }
  }, []);

  const handleAccountCard = useCallback(async (cardId: number) => {
    const response = await useGetAccountCard(cardId);
    if (response) {
      setNormal(response.normal_quantity);
      setFoil(response.foil_quantity);
    }
  }, []);

  const handleQuantity = useCallback(
    async (cardId: number, operation: string, rarity: string) => {
      if (operation === "add") {
        if (rarity === "normal") {
          console.log("normal", normal, "foil", foil);
          await usePostOwned(cardId, normal + 1, foil);
          await handleAccountCard(Number(cardId));
        } else if (rarity === "foil") {
          await usePostOwned(cardId, normal, foil + 1);
          await handleAccountCard(Number(cardId));
        }
      } else if (operation === "substract") {
        if (rarity === "normal") {
          if (normal > 0) {
            await usePostOwned(cardId, normal - 1, foil);
            await handleAccountCard(Number(cardId));
          }
        } else if (rarity === "foil") {
          if (foil > 0) {
            await usePostOwned(cardId, normal, foil - 1);
            await handleAccountCard(Number(cardId));
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    handleAccountCard(Number(cardId));
    handleCards(Number(setId), Number(cardId));
  }, [handleCards]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
      <View style={styles.quantityContainer}>
        <Button
          title="-"
          onPress={() => {
            handleQuantity(Number(cardId), "substract", "normal");
          }}
        />
        <Text style={styles.quantityText}>{normal}</Text>
        <Button
          title="+"
          onPress={() => {
            handleQuantity(Number(cardId), "add", "normal");
          }}
        />
      </View>
      <View style={styles.quantityContainer}>
        <Button
          title="-"
          onPress={() => {
            handleQuantity(Number(cardId), "substract", "foil");
          }}
        />
        <Text style={styles.quantityText}>{foil}</Text>
        <Button
          title="+"
          onPress={() => {
            handleQuantity(Number(cardId), "add", "foil");
          }}
        />
      </View>
      <Button title="Ajouter à ma wishlist" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  cardImage: {
    width: 300,
    height: 450,
    marginBottom: 16,
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
});
