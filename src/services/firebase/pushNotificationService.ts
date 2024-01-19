import * as admin from 'firebase-admin';
import logger from '../../utils/logger';
import User from '../../models/user.model';
import { MESSAGES, NOTIFICATION_TYPE } from '../../constants';

async function sendMessage(message: admin.messaging.Message): Promise<boolean> {
  try {
    const response = await admin.messaging().send(message);
    logger.info(`Successfully sent push notification: ${response}`);
    return true;
  } catch (error: any) {
    logger.info(`Error sending push notification: ${error.message}`);
    return false;
  }
}

async function getUserDeviceToken(userId: string): Promise<string | null> {
  const user = await User.findOne({ _id: userId });
  if (!user?.deviceToken) {
    logger.info(`User or device token not found: ${userId}`);
    return null;
  }
  return user.deviceToken;
}

export const sendPushNotification = async (
  deviceToken: string,
  title: string,
  body: string,
  notificationType: string,
  customData?: { [key: string]: string },
): Promise<boolean> => {
  const message: admin.messaging.Message = {
    notification: { title, body },
    data: { ...customData, type: notificationType },
    token: deviceToken,
  };
  return sendMessage(message);
};

export const sendPushNotificationWithUserId = async (
  userId: string,
  title: string,
  body: string,
  notificationType: string,
  customData?: { [key: string]: string }
): Promise<boolean> => {
  const deviceToken = await getUserDeviceToken(userId);
  if (!deviceToken) return false;

  return sendPushNotification(deviceToken, title, body, notificationType, customData);
};

export const sendPushNotificationToMultipleDevices = async (
  deviceTokens: string[],
  title: string,
  body: string,
  notificationType: string,
  customData?: { [key: string]: string }
): Promise<boolean> => {
  const messages: admin.messaging.Message[] = deviceTokens.map(deviceToken => ({
    notification: { title, body },
    data: { ...customData, type: notificationType },
    token: deviceToken,
  }));

  const results = await Promise.all(messages.map(message => sendMessage(message)));
  return results.every(result => result);
};

export const sendNoResultPush = async (userId: string): Promise<boolean> => {
  return sendPushNotificationWithUserId(
    userId,
    MESSAGES.noResult,
    MESSAGES.noResultDescription,
    NOTIFICATION_TYPE.notFound
  );
};

export const sendSuccessResultPush = async (
  userId: string,
  videoTitle: string,
  videoId: string,
  featuredVideoUrl: string
): Promise<boolean> => {
  const customData = {
    videoId: videoId,
    featuredVideoUrl: featuredVideoUrl,
    type: NOTIFICATION_TYPE.result,
  };
  return sendPushNotificationWithUserId(userId, videoTitle, MESSAGES.success, NOTIFICATION_TYPE.result, customData);
};
