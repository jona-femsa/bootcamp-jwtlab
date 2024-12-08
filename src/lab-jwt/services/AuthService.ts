import { deleteToken, storeToken } from "../utils/storage";

const jwt: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvbmEgU2FsaW5hcyIsImlhdCI6MTUxNjIzOTAyMn0.zFVeSkafwVGz55M5ok_cWCzX1dqFCIS8nWhdWLIz4uo';
const expiration: number = Date.now() + 60 * 60 * 1000;

export const login = async (username: string, password: string) => {
  if (username === "user" && password === "password") {
    await storeToken(JSON.stringify({ jwt, expiration }));
    return true;
  } else {
    await deleteToken();
    throw new Error("Invalid credentials");
  }
};
  
export const logout = async () => {
  await deleteToken();
};

export const refreshToken = async(): Promise<string> => {
  await deleteToken();

  const newExpiration: number = Date.now() + 60 * 60 * 1000;
  await storeToken(JSON.stringify({ jwt, expiration: newExpiration }));

  return jwt;
};
