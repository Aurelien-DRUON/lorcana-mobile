import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Image, Button, View, Text } from "react-native";
import { useGetCard } from "../../../hooks/useGetCard";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { usePostOwned } from "../../../hooks/usePostOwned";
import { useGetAccountCard } from "../../../hooks/useGetAccountCards";
import {
  useGetWishlistCard,
  usePostAddWishlistCard,
  usePostRemoveWishlistCard,
} from "../../../hooks/useWishlist";

export default function CardScreen() {
  const { setId, cardId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [card, setCard] = useState<{ image?: string; name?: string }>({});
  const [normal, setNormal] = useState<number>(0);
  const [foil, setFoil] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const handleCards = useCallback(
    async (setId: number, cardId: number) => {
      const response = await useGetCard(setId, cardId);
      if (response) {
        setCard(response);
        navigation.setOptions({ title: response.name });
      }
    },
    [navigation]
  );

  const handleAccountCard = useCallback(async (cardId: number) => {
    const response = await useGetAccountCard(cardId);
    if (response) {
      setNormal(response.normal_quantity);
      setFoil(response.foil_quantity);
    }
  }, []);

  const handleQuantity = useCallback(
    async (cardId: number, operation: string, rarity: string) => {
      let newNormal = normal;
      let newFoil = foil;

      if (operation === "add") {
        if (rarity === "normal") newNormal += 1;
        else if (rarity === "foil") newFoil += 1;
      } else if (operation === "substract") {
        if (rarity === "normal" && newNormal > 0) newNormal -= 1;
        else if (rarity === "foil" && newFoil > 0) newFoil -= 1;
      }

      setNormal(newNormal);
      setFoil(newFoil);
      await usePostOwned(cardId, newNormal, newFoil);
    },
    [normal, foil]
  );

  const handleWishlist = useCallback(async (cardId: number) => {
    const response = await useGetWishlistCard(cardId);
    setIsWishlisted(!!response);
  }, []);

  const handleAddWishlist = useCallback(async (cardId: number) => {
    await usePostAddWishlistCard(cardId);
    setIsWishlisted(true);
  }, []);

  const handleRemoveWishlist = useCallback(async (cardId: number) => {
    await usePostRemoveWishlistCard(cardId);
    setIsWishlisted(false);
  }, []);

  useEffect(() => {
    handleAccountCard(Number(cardId));
    handleCards(Number(setId), Number(cardId));
    handleWishlist(Number(cardId));
  }, [handleAccountCard, handleCards, handleWishlist, cardId, setId]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
      <Text style={styles.quantityText}>Normales</Text>
      <View style={styles.quantityContainer}>
        <Button
          title="-"
          onPress={() => handleQuantity(Number(cardId), "substract", "normal")}
        />
        <Text style={styles.quantityText}>{normal}</Text>
        <Button
          title="+"
          onPress={() => handleQuantity(Number(cardId), "add", "normal")}
        />
      </View>
      <Text style={styles.quantityText}>Brillantes</Text>
      <View style={styles.quantityContainer}>
        <Button
          title="-"
          onPress={() => handleQuantity(Number(cardId), "substract", "foil")}
        />
        <Text style={styles.quantityText}>{foil}</Text>
        <Button
          title="+"
          onPress={() => handleQuantity(Number(cardId), "add", "foil")}
        />
      </View>
      {isWishlisted ? (
        <Button
          title="Retirer de ma wishlist"
          onPress={() => handleRemoveWishlist(Number(cardId))}
        />
      ) : (
        <Button
          title="Ajouter à ma wishlist"
          onPress={() => handleAddWishlist(Number(cardId))}
        />
      )}
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
