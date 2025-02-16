import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useGetCards } from "../../../hooks/useGetCards";
import Card from "../../../components/Card";
import { useGetSets } from "../../../hooks/useGetSets";

export default function CardsScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);

  const handleCards = useCallback(async (id: number) => {
    const response = await useGetCards(id);
    if (response) {
      setCards(response);
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

  useEffect(() => {
    handleSets(Number(id));
    handleCards(Number(id));
  }, [handleCards]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
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
  },
  listContainer: {
    paddingVertical: 0,
    alignItems: "center",
  },
  listWrapper: {
    gap: 40,
  },
});
