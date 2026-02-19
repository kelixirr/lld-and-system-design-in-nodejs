// factory pattern
interface INotification {
  send(useId: string, message: string): void;
}

class EmailNotiification implements INotification {
  public send(userId: string, message: string): void {
    console.log(`[EMAIL] Sending to user ${userId}: ${message}`);
  }
}

class SMSNotiification implements INotification {
  public send(userId: string, message: string): void {
    console.log(`[SMS] Sending to user ${userId}: ${message}`);
  }
}

class PushNotification implements INotification {
  public send(userId: string, message: string): void {
    console.log(`[PUSH] Sending to device for user ${userId}: ${message}`);
  }
}

enum NotificationType {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
}

class NotificationFactory {
  public static createNotification(type: NotificationType): INotification {
    switch (type) {
      case NotificationType.EMAIL:
        return new EmailNotiification();
      case NotificationType.SMS:
        return new SMSNotiification();
      case NotificationType.PUSH:
        return new PushNotification();
      default:
        throw new Error("Invalid notification type requested");
    }
  }
}

class NotificationService {
  public notifyUser(
    type: NotificationType,
    useId: string,
    message: string,
  ): void {
    const notifier = NotificationFactory.createNotification(type);
    notifier.send(useId, message);
  }
}

const myAppService = new NotificationService();

console.log("--- System Alerts ---");
myAppService.notifyUser(
  NotificationType.EMAIL,
  "user_101",
  "Welcome to the platform!",
);
myAppService.notifyUser(
  NotificationType.SMS,
  "user_102",
  "URGENT: Server CPU is at 99%.",
);
myAppService.notifyUser(
  NotificationType.PUSH,
  "user_103",
  "Your data export is ready.",
);
