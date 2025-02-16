import { Stack } from "expo-router";
import { View } from "react-native";

export default function CardLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack initialRouteName="sets">
        <Stack.Screen name="sets" options={{ headerShown: false }} />
        <Stack.Screen name="cards" options={{ headerShown: false }} />
        <Stack.Screen name="card" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
