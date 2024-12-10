import React, { useEffect, useState } from 'react';
import { NativeModules, SafeAreaView, Text } from 'react-native';

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

  return (
    <SafeAreaView>
      <Text>Hola Mundo</Text>
      <Text>Battery: { battery }</Text>
    </SafeAreaView>
  );
}

export default App;
