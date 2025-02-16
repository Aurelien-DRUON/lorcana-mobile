import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePostOwned = async (
  id: number,
  normal: number,
  foil: number
): Promise<string | null> => {
  const token = await AsyncStorage.getItem("userToken");
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    normal,
    foil,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `https://lorcana.brybry.fr/api/me/${id}/update-owned`,
      requestOptions
    );
    const result = await response.json();
  } catch (error) {
    console.error(error);
  }

  return null;
};
