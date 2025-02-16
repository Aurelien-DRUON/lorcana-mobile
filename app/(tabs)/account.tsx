import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useGetAccount } from "../../hooks/useGetAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AccountScreen() {
  const [account, setAccount] = useState(null);

  const handleAccount = useCallback(async () => {
    const response = await useGetAccount();
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
      <Text>{account?.name}</Text>
      <Text>{account?.email}</Text>
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
