import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AccountCard {
  id: number;
  normal_quantity: number;
  foil_quantity: number;
}

export const useGetAccountCards = async (): Promise<AccountCard[] | null> => {
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
      `https://lorcana.brybry.fr/api/me/cards`,
      requestOptions
    );
    const result: { data: AccountCard[] } = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const useGetAccountCard = async (
  cardId: number
): Promise<AccountCard | null> => {
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
      `https://lorcana.brybry.fr/api/me/cards`,
      requestOptions
    );
    const result: { data: AccountCard[] } = await response.json();
    const card = result.data.find((card) => card.id === cardId);
    if (card) {
      return card;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};
