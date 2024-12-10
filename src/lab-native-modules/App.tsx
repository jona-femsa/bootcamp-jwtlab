import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import BatteryModule from './modules/BatteryModule';

const App = () => {
  const [battery, setBattery] = useState<number>(0);

  useEffect(() => {
    BatteryModule.getBatteryLevel()
      .then((level: number) => {
        setBattery(level);
      })
      .catch((error: string) => console.log(error));

    // Suscribirse a los eventos de cambio de batería
    const subscription = BatteryModule.subscribeToBatteryLevelChanges((level: number) => {
      if (level >= 0) {
        setBattery(level);
      } else {
        console.log('Received invalid battery level');
      }

      if(level < 20) {
        Alert.alert('¡Batería baja!');
      }
    });

    return () => {
      if (subscription) {
        BatteryModule.unsubscribeFromBatteryLevelChanges(subscription);
      }
    };
  }, []);

  const getBatteryLevelColor = (): string => {
    if (battery === null || battery === undefined || battery < 0) {return 'gray';}
    if (battery > 75) {return 'green';}
    if (battery > 50) {return 'orange';}
    if (battery > 25) {return 'red';}
    return 'darkred';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.batteryContainer}>
        <Text style={[styles.batteryText, { color: getBatteryLevelColor() }]}>
          Battery: {battery}%
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  deviceText: {
    fontSize: 20,
    marginTop: 20,
    color: '#333',
  },
  batteryContainer: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  batteryText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
