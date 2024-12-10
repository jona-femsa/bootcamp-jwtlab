package com.jwtapp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments

class BatteryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val batteryReceiver: BroadcastReceiver

    init {
        // Inicialización del receptor de eventos
        batteryReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                val level = intent?.getIntExtra("level", -1) ?: -1
                sendBatteryLevelChangedEvent(level)
            }
        }

        // Registrar el BroadcastReceiver para escuchar cambios en el nivel de la batería
        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        reactContext.registerReceiver(batteryReceiver, filter)
    }

    override fun getName(): String {
        return "BatteryModule"
    }

    private fun sendBatteryLevelChangedEvent(level: Int) {
        val event: WritableMap = Arguments.createMap() // Crear el mapa
        event.putInt("level", level) // Agregar el nivel de batería al mapa
        sendEvent("BatteryLevelChanged", event) // Enviar el evento
    }

    private fun sendEvent(eventName: String, params: WritableMap) {
        if (currentActivity != null) {
            currentActivity?.runOnUiThread {
                reactApplicationContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit(eventName, params)
            }
        }
    }

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        // Obtener el estado actual de la batería
        val batteryStatus = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        val batteryStatusIntent = reactApplicationContext.registerReceiver(null, batteryStatus)
        val level = batteryStatusIntent?.getIntExtra("level", -1) ?: -1
        if (level != -1) {
            promise.resolve(level)
        } else {
            promise.reject("E_BATTERY_LEVEL", "Battery level unavailable")
        }
    }
}
