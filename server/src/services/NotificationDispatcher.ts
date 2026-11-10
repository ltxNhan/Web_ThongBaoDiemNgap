export class NotificationDispatcher {
  public static async dispatchTelegramAlert(chatId: string, message: string): Promise<boolean> {
    console.log(`[NotificationDispatcher] [Telegram -> ${chatId}]: ${message}`);
    return true;
  }

  public static async dispatchZaloZns(phone: string, templateId: string, params: Record<string, any>): Promise<boolean> {
    console.log(`[NotificationDispatcher] [Zalo ZNS -> ${phone}]: Template ${templateId}`, params);
    return true;
  }

  public static async dispatchSmsBrandname(phone: string, message: string): Promise<boolean> {
    console.log(`[NotificationDispatcher] [SMS Brandname -> ${phone}]: ${message}`);
    return true;
  }

  public static async broadcastEmergency(title: string, content: string, districts: string[]): Promise<void> {
    console.log(`[NotificationDispatcher] [BROADCAST EMERGENCY]: ${title} for districts: ${districts.join(', ')}`);
  }
}
