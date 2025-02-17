import { View, StyleSheet, Button, TextInput, Text } from "react-native";
import { useState, useCallback } from "react";
import { usePostLogin } from "../hooks/usePostLogin";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(async (email: string, password: string) => {
    const response = await usePostLogin(email, password);
    if (response) {
      router.replace("/(tabs)/collection");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Connexion" onPress={() => handleLogin(email, password)} />
      <View>
        <Text>Vous n'avez pas de compte ?</Text>
        <Button
          title="Créer un compte"
          onPress={() => router.replace("/register")}
        />
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
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});
