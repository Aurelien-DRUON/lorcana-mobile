import { router, Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
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
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="(cards)"
          options={{
            title: "Cartes",
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Compte",
          }}
        />
      </Tabs>
    </View>
  );
}
