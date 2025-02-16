import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Set {
  id: number;
  name: string;
  code: string;
  release_date: string | null;
  card_number: number;
}

export const useSets = async (): Promise<Set[] | null> => {
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
      "https://lorcana.brybry.fr/api/sets",
      requestOptions
    );
    const result: { data: Set[] } = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }

  return null;
};
