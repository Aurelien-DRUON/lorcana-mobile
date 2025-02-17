import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePostRegister = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<{
  message: string;
  user?: { id: number; name: string; email: string };
} | null> => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name,
    email,
    password,
    password_confirmation,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      "https://lorcana.brybry.fr/api/register",
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }

  return null;
};
