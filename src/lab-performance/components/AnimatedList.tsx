import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { FlatList } from 'react-native';

const DATA = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

export default function AnimatedList() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => <AnimatedListItem text={item} index={index} />}
    />
  );
}

function AnimatedListItem({ text, index }: { text: string; index: number }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  React.useEffect(() => {
    opacity.value = withDelay(index * 200, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 200, withTiming(0, { duration: 500 }));
  }, [index, opacity, translateY]);

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'coral',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
  },
});
