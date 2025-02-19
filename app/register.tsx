import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { usePostRegister } from "../hooks/usePostRegister";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = useCallback(
    async (name, email, password, passwordConfirm) => {
      const response = await usePostRegister(
        name,
        email,
        password,
        passwordConfirm
      );
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
      <Text style={styles.title}>Créer un compte</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="gold"
          value={name}
          onChangeText={setName}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirmation du mot de passe"
          placeholderTextColor="gold"
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() =>
          handleRegister(name, email, password, passwordConfirmation)
        }
      >
        <Text style={styles.registerButtonText}>Inscription</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.messageText}>{message}</Text> : null}
      <Text style={styles.accountText}>Vous avez déjà un compte ?</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.loginButtonText}>Se connecter</Text>
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
    color: "white",
  },
  registerButton: {
    backgroundColor: "gold",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  registerButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountText: {
    color: "gold",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "gold",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageText: {
    color: "yellow",
    marginVertical: 10,
    fontSize: 14,
  },
});
