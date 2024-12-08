// components/SearchComponent.tsx
import React, { useCallback, useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { debounce } from 'lodash';

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

const SearchComponent = ({ onSearch }: SearchComponentProps) => {
    const handleSearch = useCallback(
      debounce((searchTerm) => {
        onSearch(searchTerm);
      }, 300),
      []
    );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar usuarios"
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default SearchComponent;
