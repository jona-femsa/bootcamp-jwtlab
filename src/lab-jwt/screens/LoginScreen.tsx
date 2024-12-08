import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { login } from '../services/AuthService';

const validatePassword = (password: string) => password.length >= 8;
const validateUser = (user: string) => user.length >= 4;

const LoginScreen: React.FC = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if( !validateUser(username) ){
      setError('user debe ser de al menos 4 caracteres');
      return;
    } else if( !validatePassword(password) ) {
      setError('password debe ser de al menos 8 caracteres');
      return;
    }

    try {
      await login(username, password);
      navigation.navigate('Profile');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;
