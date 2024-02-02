import AsyncStorage from "@react-native-async-storage/async-storage";

export const setDataToStore = async <T = unknown>(key: string, data: T) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    throw e as Error;
  }
};

export const getDataFromStore = async <T = unknown>(key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (e) {
    throw e as Error;
  }
};
