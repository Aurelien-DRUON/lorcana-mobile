import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSets } from "../../../hooks/useSets";

export default function SetsScreen() {
  const [sets, setSets] = useState([]);

  const handleSets = useCallback(async () => {
    const response = await useSets();
    if (response) {
      console.log(response);
      setSets(response);
    }
  }, []);

  useEffect(() => {
    handleSets();
  }, [handleSets]);

  return (
    <View style={styles.container}>
      {sets.length > 0 ? (
        sets.map((set) => <Text key={set.id}>{set.name}</Text>)
      ) : (
        <Text>No sets available</Text>
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
  },
});
