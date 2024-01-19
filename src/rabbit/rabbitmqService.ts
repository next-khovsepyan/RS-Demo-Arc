import amqp from "amqplib";
import { AMQP_CONNECTION_STRING } from "../config";
import logger from "../utils/logger";

class RabbitMQService {
  private rabbitMqConnection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private messageHandlers: Map<string, (message: any) => Promise<void>> = new Map();

  public async connect(): Promise<void> {
    if (this.rabbitMqConnection) return;

    try {
      const connectionOptions = { heartbeat: 600 };
      this.rabbitMqConnection = await amqp.connect(AMQP_CONNECTION_STRING, connectionOptions);
      this.channel = await this.rabbitMqConnection.createChannel();
      logger.info("Connected to RabbitMQ");
    } catch (error: any) {
      logger.error(`Error connecting to RabbitMQ: ${error.message}`);
      throw error;
    }
  }

  public async connectWithRetry(retryInterval = 10000): Promise<void> {
    while (!this.rabbitMqConnection) {
      try {
        await this.connect();
        logger.info("Successfully connected to RabbitMQ");
      } catch (error: any) {
        logger.error(`Error connecting to RabbitMQ: ${error.message}, retrying in ${retryInterval / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryInterval));
      }
    }
  }

  public async createQueue(queueName: string): Promise<void> {
    this.assertChannelInitialized();
    await this.channel!.assertQueue(queueName, { durable: true });
  }

  public sendMessageToQueue(queueName: string, message: any): void {
    this.assertChannelInitialized();
    this.channel!.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
  }

  public registerMessageHandler(queueName: string, messageHandler: (message: any) => Promise<void>): void {
    this.messageHandlers.set(queueName, messageHandler);
  }

  public listenToQueue(queueName: string): void {
    this.assertChannelInitialized();
    this.channel!.consume(queueName, async (msg) => {
      if (msg) {
        await this.handleMessage(queueName, msg);
      }
    });
  }

  private async handleMessage(queueName: string, msg: amqp.ConsumeMessage): Promise<void> {
    try {
      const message = JSON.parse(msg.content.toString());
      const messageHandler = this.messageHandlers.get(queueName);

      if (!messageHandler) {
        logger.error(`No message handler registered for queue: ${queueName}`);
        this.channel!.nack(msg);
        return;
      }

      await messageHandler(message);
      this.channel!.ack(msg);
    } catch (error: any) {
      logger.error(`Error processing message: ${error.message}`);
      this.channel!.nack(msg);
    }
  }

  public async deleteAllMessagesFromQueue(queueName: string): Promise<void> {
    this.assertChannelInitialized();

    const { messageCount } = await this.channel!.checkQueue(queueName);
    if (messageCount === 0) {
      logger.info(`Queue '${queueName}' is already empty.`);
      return;
    }

    await this.channel!.purgeQueue(queueName);
    logger.info(`Successfully deleted all messages from queue: ${queueName}`);
  }

  public close(): void {
    if (this.rabbitMqConnection) {
      this.rabbitMqConnection.close();
      this.rabbitMqConnection = null;
      this.channel = null;
      logger.warn(`Disconnected from RabbitMQ`);
    }
  }

  private assertChannelInitialized(): void {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized.");
    }
  }
}

export default new RabbitMQService();
