import React, { useEffect, useState } from "react";
import { fetchUsers } from "./services/ApiService";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

interface User {
  id: number;
  name: string;
  email: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async() => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch(error) {
        setError('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if(loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff"/>
      </View>
    );
  }

  if(error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{ error }</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      <FlatList
        data={ users }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{ item.name }</Text>
            <Text style={styles.email}>{ item.email }</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default App;