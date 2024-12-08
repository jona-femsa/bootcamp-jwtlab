// components/UserList.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { fetchUsers } from '../services/ApiService';
import SearchComponent from './SearchComponent';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const [search, setSearch] = useState<string>('');    

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', search],
    queryFn: () => fetchUsers(search),
    retry: 3, // Reintenta hasta 3 veces en caso de fallo
  });

  const handleSearch = (query: srting) => {
    setSearch(query);
    refetch();
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error al cargar los datos de los usuario. Intenta nuevamente mas tarde.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario</Text>
      <SearchComponent onSearch={handleSearch}/>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
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
    textAlign: 'center',
  },
});

export default UserList;
