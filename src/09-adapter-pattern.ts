interface IAnalyticsLogger {
  track(eventName: string): void;
}

// old, original implementation (
class LegacyInternalLogger implements IAnalyticsLogger {
  public track(eventName: string): void {
    console.log(`[Local DB] Logging event: ${eventName}`);
  }
}

// You CANNOT change this code. It belongs to another company. A New SDK
class ExternalAnalyticsSDK {
  public sendAnalyticsEvent(payload: {
    action_id: string;
    timestamp: number;
  }): void {
    console.log(`[External SDK] Uploading payload to cloud:`, payload);
  }
}

// This class implements your app's interface, but uses the External SDK under the hood.
class MixpanelAdapter implements IAnalyticsLogger {
  private externalSDK: ExternalAnalyticsSDK;

  constructor() {
    this.externalSDK = new ExternalAnalyticsSDK();
  }

  public track(eventName: string): void {
    // The Adapter translates 'track' into the complex payload the SDK needs
    const translatedPayload = {
      action_id: eventName.toUpperCase(),
      timestamp: Date.now(),
    };

    // The Adapter passes the translated data to the incompatible library
    this.externalSDK.sendAnalyticsEvent(translatedPayload);

    console.log("Done");
  }
}

// A function in your app that expects the standard IAnalyticsLogger interface
function userClickedCheckout(logger: IAnalyticsLogger) {
  logger.track("checkout_button_clicked");
}

// Using the old legacy logger
const oldLogger = new LegacyInternalLogger();
userClickedCheckout(oldLogger);

//  The business upgrades to the new SDK.
const newAdaptedLogger = new MixpanelAdapter();
userClickedCheckout(newAdaptedLogger);
