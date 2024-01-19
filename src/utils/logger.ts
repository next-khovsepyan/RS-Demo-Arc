import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;
const myFormat = printf(({ level, message, timestamp: time }) => `${time} LOG ${level}: ${message}`);

const loggerConfig = {
  transports: [new transports.Console()],
  format: combine(timestamp(), myFormat),
};

const logger = createLogger(loggerConfig);

export default logger;