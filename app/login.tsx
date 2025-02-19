import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { usePostLogin } from "../hooks/usePostLogin";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(async (email, password) => {
    const response = await usePostLogin(email, password);
    if (response) {
      router.replace("/(tabs)/collection");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gold"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="gold"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleLogin(email, password)}
      >
        <Text style={styles.loginButtonText}>Connexion</Text>
      </TouchableOpacity>
      <Text style={styles.accountText}>Vous n'avez pas de compte ?</Text>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.replace("/register")}
      >
        <Text style={styles.registerButtonText}>Créer un compte</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "yellow",
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    padding: 15,
    borderWidth: 2,
    borderColor: "gold",
    borderRadius: 10,
    backgroundColor: "darkslateblue",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "gold",
    color: "gold",
  },
  loginButton: {
    backgroundColor: "gold",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountText: {
    color: "gold",
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "gold",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  registerButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
