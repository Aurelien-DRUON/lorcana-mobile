import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useGetSets } from "../../../hooks/useGetSets";
import Set from "../../../components/Set";

export default function SetsScreen() {
  const [sets, setSets] = useState([]);

  const handleSets = useCallback(async () => {
    const response = await useGetSets();
    if (response) {
      setSets(response);
    }
  }, []);

  useEffect(() => {
    handleSets();
  }, [handleSets]);

  return (
    <View style={styles.container}>
      <FlatList
        data={sets}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        keyExtractor={(set) => set.id.toString()}
        renderItem={({ item }) => <Set item={item} key={item.id} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "indigo",
  },
});
