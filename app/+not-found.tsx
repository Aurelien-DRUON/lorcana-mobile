import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>Hé, vous êtes pas censés être là !</Text>
        <Link href="/">
          <Text>
            Allez retournez à l'accueil et que je ne vous y reprennes plus
          </Text>
        </Link>
      </View>
    </>
  );
}
