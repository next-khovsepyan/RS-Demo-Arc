import {
  IDownloadCompletedRequest,
  IScrapMovie,
  IErrorMessage,
} from "../interfaces/rabbit/requests";

import logger from "../utils/logger";
import {
  CHANGE_STATUS_CHANNEL,
  COMPARE_VECTORS,
  COMPARE_VECTORS_COMPLETED,
  COMPARE_VECTORS_REPLY,
  ERROR_DOWNLOAD_CHANNEL,
  FEATURE_VECTORS_PROGRESS_CHANNEL,
  INDEXING_CUTTING_FRAMES_COMPLETE_CHANNEL,
  INDEXING_FEATURE_VECTORS_COMPLETED_CHANNEL,
  START_DOWNLOAD_CHANNEL,
  START_INDEXING_CHANNEL,
  SUCCESS_DOWNLOAD_CHANNEL,
  VECTORS_FROM_IMAGE,
  VECTORS_FROM_IMAGE_COMPLETED,
  VIDEO_DETAILS_FETCH,
  VIDEO_DETAILS_FETCH_COMPLETED,
  RECEIVED_VIDEOS,
  ERROR_SCRAPER,
  RUN_SCRAPER,
} from "./channels";
import rabbitmqService from "./rabbitmqService";

export async function setupRabbitMQ(): Promise<void> {
  try {
    await rabbitmqService.connectWithRetry();
    await rabbitmqService.createQueue(START_DOWNLOAD_CHANNEL);
    await rabbitmqService.createQueue(START_INDEXING_CHANNEL);
    await rabbitmqService.createQueue(INDEXING_CUTTING_FRAMES_COMPLETE_CHANNEL);
    await rabbitmqService.createQueue(
      INDEXING_FEATURE_VECTORS_COMPLETED_CHANNEL
    );
    await rabbitmqService.createQueue(CHANGE_STATUS_CHANNEL);
    await rabbitmqService.createQueue(FEATURE_VECTORS_PROGRESS_CHANNEL);
    await rabbitmqService.createQueue(VECTORS_FROM_IMAGE);
    await rabbitmqService.createQueue(VECTORS_FROM_IMAGE_COMPLETED);
    await rabbitmqService.createQueue(COMPARE_VECTORS);
    await rabbitmqService.createQueue(COMPARE_VECTORS_COMPLETED);
    await rabbitmqService.createQueue(COMPARE_VECTORS_REPLY);
    await rabbitmqService.createQueue(VIDEO_DETAILS_FETCH);
    await rabbitmqService.createQueue(VIDEO_DETAILS_FETCH_COMPLETED);
    await rabbitmqService.createQueue(SUCCESS_DOWNLOAD_CHANNEL);
    await rabbitmqService.createQueue(RECEIVED_VIDEOS);
    await rabbitmqService.createQueue(ERROR_SCRAPER);
    await rabbitmqService.createQueue(RUN_SCRAPER);
    await rabbitmqService.createQueue(ERROR_DOWNLOAD_CHANNEL);

    rabbitmqService.registerMessageHandler(
      SUCCESS_DOWNLOAD_CHANNEL,
      async (message: IDownloadCompletedRequest) => {
        try {
          //Send complete message to rabbitmq
        } catch (error: any) {
          logger.error(`Error processing message: ${error.message}`);
        }
      }
    );

    rabbitmqService.registerMessageHandler(
      RECEIVED_VIDEOS,
      async (message: IScrapMovie[]) => {
        try {
          const videos = message;
          // Send videos with rabbitmq          
        } catch (error: any) {
          logger.error(`Error processing message: ${error.message}`);
        }
      }
    );

    rabbitmqService.registerMessageHandler(
      ERROR_SCRAPER,
      async (message: IErrorMessage) => {
        try {
          // Send error message with rabbitmq
        } catch (error: any) {
          logger.error(`Error processing message: ${error.message}`);
        }
      }
    );

    rabbitmqService.registerMessageHandler(
      ERROR_DOWNLOAD_CHANNEL,
      async (message: IDownloadCompletedRequest) => {
        try {
          // Send error message with rabbitmq
        } catch (error: any) {
          logger.error(`Error processing message: ${error.message}`);
        }
      }
    );

    rabbitmqService.listenToQueue(SUCCESS_DOWNLOAD_CHANNEL);
    rabbitmqService.listenToQueue(RECEIVED_VIDEOS);
    rabbitmqService.listenToQueue(ERROR_SCRAPER);
    rabbitmqService.listenToQueue(ERROR_DOWNLOAD_CHANNEL);
    rabbitmqService.listenToQueue(INDEXING_CUTTING_FRAMES_COMPLETE_CHANNEL);
    rabbitmqService.listenToQueue(INDEXING_FEATURE_VECTORS_COMPLETED_CHANNEL);
    rabbitmqService.listenToQueue(CHANGE_STATUS_CHANNEL);
    rabbitmqService.listenToQueue(FEATURE_VECTORS_PROGRESS_CHANNEL);
    rabbitmqService.listenToQueue(VECTORS_FROM_IMAGE_COMPLETED);
    rabbitmqService.listenToQueue(COMPARE_VECTORS_COMPLETED);
    rabbitmqService.listenToQueue(COMPARE_VECTORS_REPLY);
    rabbitmqService.listenToQueue(VIDEO_DETAILS_FETCH_COMPLETED);

    logger.info("RabbitMQ connection established");
  } catch (error: any) {
    logger.error(`Error connecting to RabbitMQ: ${error.message}`);
    process.exit(1);
  }
}
