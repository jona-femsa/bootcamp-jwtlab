#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(BatteryModule, RCTEventEmitter)

// Exponer el método getBatteryLevel
RCT_EXTERN_METHOD(
  getBatteryLevel: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

// Exponer los eventos de nivel de batería
RCT_EXTERN_METHOD(
  startObserving
)

RCT_EXTERN_METHOD(
  stopObserving
)

// Exponer los eventos soportados
RCT_EXTERN_METHOD(
  supportedEvents
)

@end
