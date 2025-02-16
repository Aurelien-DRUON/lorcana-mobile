import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Card {
  id: number;
  set_id: number;
  name: string;
  version: string;
  number: number;
  card_identifier: string;
  image: string;
  thumbnail: string;
  description: string;
  rarity: string;
  story: string;
  normal_quantity: number;
  foil_quantity: number;
}

export const useGetCard = async (
  setId: number,
  cardId: number
): Promise<Card | null> => {
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
      `https://lorcana.brybry.fr/api/sets/${setId}/cards`,
      requestOptions
    );
    const result: { data: Card[] } = await response.json();
    return result.data.find((card) => card.id === cardId);
  } catch (error) {
    console.error(error);
  }

  return null;
};
