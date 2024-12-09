import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const IMAGE_URLS = Array.from({ length: 1000 }, (_, i) => 
    `https://via.placeholder.com/600x400.png?text=Imagen+${i + 1}`
);

export default function GalleryScreen() {
  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <FastImage
        style={styles.image}
        source={{
          uri: item,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );

  return (
    <FlatList
      data={IMAGE_URLS}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      initialNumToRender={10}
      windowSize={5}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  imageContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
});
