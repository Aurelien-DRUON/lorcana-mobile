import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function CardLayout() {
  useEffect(() => {
    const checkUserToken = async () => {
      const userToken = await AsyncStorage.getItem("userToken");

      if (!userToken) {
        router.replace("../login");
      }
    };

    checkUserToken();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="cards" options={{ headerShown: false }} />
        <Stack.Screen name="card" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
