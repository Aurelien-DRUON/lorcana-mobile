import { View, StyleSheet, Button, TextInput, Text } from "react-native";
import { useState, useCallback } from "react";
import { router } from "expo-router";
import { usePostRegister } from "../hooks/usePostRegister";

export default function LoginScreen() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      passwordConfirm: string
    ) => {
      const response = await usePostRegister(
        name,
        email,
        password,
        passwordConfirm
      );
      console.log(response);
      if (response.message) {
        setMessage(response.message);
      }
      if (response.user) {
        router.replace("/login");
      }
    },
    []
  );

  return (
    <View style={styles.container}>
      <Text>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmation du mot de passe"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />
      <Button
        title="Inscription"
        onPress={() =>
          handleRegister(name, email, password, passwordConfirmation)
        }
      />
      <Text>{message}</Text>
      <View>
        <Text>Vous avez déjà un compte ?</Text>
        <Button title="Se connecter" onPress={() => router.replace("/login")} />
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
