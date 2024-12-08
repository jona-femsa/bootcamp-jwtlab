import React from "react";
import { View, Text, Button } from "react-native";
import { logout } from "../services/AuthService";
import { getToken } from "../utils/storage";
import api from "../services/ApiService";

const ProfileScreen: React.FC = ({ navigation }) => {
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };

  const handleAPI = async() => {
    const credentials = await getToken();
    console.log(JSON.parse(credentials));
  };

  return (
    <View>
      <Text>Welcome to the Profile Screen!</Text>
      <Button title="API" onPress={handleAPI}></Button>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
