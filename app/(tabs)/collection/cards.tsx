import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useGetCards } from "../../../hooks/useGetCards";
import Card from "../../../components/Card";
import { useGetSets } from "../../../hooks/useGetSets";
import { useGetAccountCards } from "../../../hooks/useGetAccountCards";
import { useGetWishlistCards } from "../../../hooks/useWishlist";
import { useFocusEffect } from "@react-navigation/native";

export default function CardsScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [owned, setOwned] = useState([]);

  const handleCards = useCallback(async (id: number) => {
    const response = await useGetCards(id);
    if (response) {
      setCards(response);
      setFilteredCards(response);
    }
  }, []);

  const handleSets = useCallback(async (id: number) => {
    const response = await useGetSets();
    if (response) {
      navigation.setOptions({
        title: response.find((set) => set.id === id).name,
      });
    }
  }, []);

  const handleWishlist = useCallback(async () => {
    const response = await useGetWishlistCards();
    if (response) {
      setWishlist(response);
    }
  }, []);

  const handleOwned = useCallback(async () => {
    const response = await useGetAccountCards();
    if (response) {
      setOwned(response);
    }
  }, []);

  useEffect(() => {
    handleSets(Number(id));
    handleCards(Number(id));
  }, [handleCards]);

  useFocusEffect(
    useCallback(() => {
      handleWishlist();
      handleOwned();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFilteredCards(cards)}
        >
          <Text style={styles.buttonText}>Toutes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setFilteredCards(
              cards.filter((card) => owned.some((own) => own.id === card.id))
            );
          }}
        >
          <Text style={styles.buttonText}>Possédés</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setFilteredCards(
              cards.filter((card) => !owned.some((own) => own.id === card.id))
            );
          }}
        >
          <Text style={styles.buttonText}>Non possédées</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setFilteredCards(
              cards.filter((card) =>
                wishlist.some((wish) => wish.id === card.id)
              )
            );
          }}
        >
          <Text style={styles.buttonText}>Voulues</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCards}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(card) => card.id.toString()}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.listWrapper}
        renderItem={({ item }) => <Card item={item} setId={id} key={item.id} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "indigo",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    backgroundColor: "darkslateblue",
    paddingVertical: 12,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "gold",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    width: "100%",
    color: "indigo",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },
  listContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  listWrapper: {
    gap: 20,
  },
});
