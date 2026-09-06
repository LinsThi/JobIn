export interface NotificationDTO {
  id: string;
  type: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  readAt?: string;
  createdAt: string;
}

export interface NotificationsResponse {
  data: NotificationDTO[];
  unreadCount: number;
}
