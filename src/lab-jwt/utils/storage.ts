import * as Keychain from 'react-native-keychain';

export const storeToken = async(token: string) => {
  await Keychain.setGenericPassword('authToken', token);
};

export const getToken = async(): Promise<string | null> => {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
};

export const deleteToken = async () => {
  await Keychain.resetGenericPassword();
};
