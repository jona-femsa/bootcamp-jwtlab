import React, { useEffect, useState } from 'react';
import { NativeModules, SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface BatteryModuleType {
  getBatteryLevel(): Promise<number>;
}

const {  BatteryModule } = NativeModules;

const App = () => {
  const [battery, setBattery] = useState<number>(0);

  useEffect(() => {
    (BatteryModule as BatteryModuleType)
      .getBatteryLevel()
      .then((level) => {
        setBattery(level);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getBatteryLevelColor = (): string => {
    if (battery === null) return "gray";
    if (battery > 75) return "green";
    if (battery > 50) return "orange";
    if (battery > 25) return "red";
    return "darkred";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.batteryContainer}>
        <Text style={[styles.batteryText, { color: getBatteryLevelColor() }]}>
          Battery: { battery }%
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  deviceText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333",
  },
  batteryContainer: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  batteryText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default App;
