import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
        rarity === "normal" ? newNormal++ : newFoil++;
      } else if (operation === "substract") {
        if (rarity === "normal" && newNormal > 0) newNormal--;
        else if (rarity === "foil" && newFoil > 0) newFoil--;
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
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Possession</Text>
        <View style={styles.quantityRow}>
          <Text style={styles.label}>Normales :</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleQuantity(Number(cardId), "substract", "normal")
            }
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{normal}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleQuantity(Number(cardId), "add", "normal")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.quantityRow}>
          <Text style={styles.label}>Brillantes :</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleQuantity(Number(cardId), "substract", "foil")}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{foil}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleQuantity(Number(cardId), "add", "foil")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={isWishlisted ? styles.wishlistRemove : styles.wishlistAdd}
        onPress={() =>
          isWishlisted
            ? handleRemoveWishlist(Number(cardId))
            : handleAddWishlist(Number(cardId))
        }
      >
        <Text
          style={
            isWishlisted ? styles.textWishlistRemove : styles.textWishlistAdd
          }
        >
          {isWishlisted ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "indigo",
  },
  cardImage: {
    width: 300,
    height: 450,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "gold",
    marginBottom: 16,
  },
  section: {
    backgroundColor: "darkslateblue",
    padding: 16,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gold",
    marginBottom: 10,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    color: "white",
    marginRight: 10,
  },
  button: {
    backgroundColor: "gold",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 10,
  },
  wishlistAdd: {
    backgroundColor: "gold",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  wishlistRemove: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  textWishlistAdd: {
    color: "darkslateblue",
    fontWeight: "bold",
    fontSize: 16,
  },
  textWishlistRemove: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 16,
  },
});
