import AsyncStorage from "@react-native-async-storage/async-storage";

export interface WishlistCard {
  id: 0;
  set_id: 0;
  name: "string";
  version: "string";
  number: 0;
  card_identifier: "string";
  image: "string";
  thumbnail: "string";
  description: "string";
  rarity: "string";
  story: "string";
  normal_quantity: 0;
  foil_quantity: 0;
}

export const useGetWishlistCard = async (
  cardId: number
): Promise<WishlistCard | null> => {
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
      `https://lorcana.brybry.fr/api/wishlist`,
      requestOptions
    );
    const result: { data: WishlistCard[] } = await response.json();
    return result.data.find((card) => card.id === cardId);
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const usePostAddWishlistCard = async (
  cardId: number
): Promise<string | null> => {
  const token = await AsyncStorage.getItem("userToken");
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    card_id: cardId,
  });
  console.log("ça marche ou quoi ?");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    await fetch(`https://lorcana.brybry.fr/api/wishlist/add`, requestOptions);
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const usePostRemoveWishlistCard = async (
  cardId: number
): Promise<string | null> => {
  const token = await AsyncStorage.getItem("userToken");
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    card_id: cardId,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    await fetch(
      `https://lorcana.brybry.fr/api/wishlist/remove`,
      requestOptions
    );
  } catch (error) {
    console.error(error);
  }

  return null;
};
