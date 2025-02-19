import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
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
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: account?.avatar || "https://picsum.photos//100" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{account?.name}</Text>
        <Text style={styles.email}>{account?.email}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
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
  profileContainer: {
    alignItems: "center",
    backgroundColor: "darkslateblue",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "gold",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gold",
  },
  email: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  buttonsContainer: {
    marginTop: 20,
    width: "90%",
  },
  editButton: {
    backgroundColor: "gold",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
