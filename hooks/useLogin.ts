import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogin = async (
  email: string,
  password: string
): Promise<string | null> => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email,
    password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      "https://lorcana.brybry.fr/api/login",
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    if (result.token) {
      await AsyncStorage.setItem("userToken", result.token);
      return result.token;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};
