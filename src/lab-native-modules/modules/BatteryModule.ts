import { NativeEventEmitter, NativeModules } from 'react-native';

const { BatteryModule } = NativeModules;

const batteryEventEmitter = new NativeEventEmitter(BatteryModule);

const subscribeToBatteryLevelChanges = (callback: (level: number) => void) => {
  return batteryEventEmitter.addListener('BatteryLevelChanged', (event) => {
    callback(event.level);
  });
};

const unsubscribeFromBatteryLevelChanges = (subscription: any) => {
  subscription.remove();
};

export default {
  getBatteryLevel: BatteryModule.getBatteryLevel,
  subscribeToBatteryLevelChanges,
  unsubscribeFromBatteryLevelChanges,
};
