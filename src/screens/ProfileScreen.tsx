import React from "react";
import { View, Text, Button } from "react-native";
import { logout } from "../services/AuthService";

const ProfileScreen: React.FC = ({ navigation }) => {
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };

  return (
    <View>
      <Text>Welcome to the Profile Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
