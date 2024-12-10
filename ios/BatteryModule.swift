import Foundation
import React

@objc(BatteryModule)
class BatteryModule: RCTEventEmitter {
    
    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    // Emisión de eventos cuando el nivel de batería cambia
    override func startObserving() {
        UIDevice.current.isBatteryMonitoringEnabled = true
        NotificationCenter.default.addObserver(self, selector: #selector(batteryLevelChanged), name: UIDevice.batteryLevelDidChangeNotification, object: nil)
    }

    override func stopObserving() {
        NotificationCenter.default.removeObserver(self)
    }

    @objc func batteryLevelChanged() {
        let batteryLevel = UIDevice.current.batteryLevel * 100
        sendEvent(withName: "BatteryLevelChanged", body: ["level": batteryLevel])
    }

    @objc
    func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        UIDevice.current.isBatteryMonitoringEnabled = true
        let batteryLevel = UIDevice.current.batteryLevel
        if batteryLevel >= 0 {
            resolve(Int(batteryLevel * 100))
        } else {
            let error = NSError(domain: "", code: 200, userInfo: nil)
            reject("E_BATTERY_LEVEL", "Battery level unavailable", error)
        }
    }

    override func supportedEvents() -> [String]! {
        return ["BatteryLevelChanged"]
    }
}
