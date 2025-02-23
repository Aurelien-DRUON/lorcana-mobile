import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Account {
  id: number;
  name: string;
  email: string;
}

export const useGetAccount = async (): Promise<Account | null> => {
  const token = await AsyncStorage.getItem("userToken");
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      "https://lorcana.brybry.fr/api/me",
      requestOptions
    );
    const result: Account = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }

  return null;
};
