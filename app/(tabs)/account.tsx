import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAccount } from "../../hooks/useAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AccountScreen() {
  const [account, setAccount] = useState(null);

  const handleAccount = useCallback(async () => {
    const response = await useAccount();
    if (response) {
      setAccount(response);
    }
  }, []);

  const handleLogout = useCallback(() => {
    AsyncStorage.removeItem("userToken");
    router.replace("/login");
  }, []);

  useEffect(() => {
    handleAccount();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{account?.email}</Text>
      <Text>{account?.name}</Text>
      <Button title="Déconnexion" onPress={handleLogout} />
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
