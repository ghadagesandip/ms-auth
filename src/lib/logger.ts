import { existsSync, mkdirSync } from 'fs';
import { Logger } from 'winston';
import winston = require('winston');
import dotenv from 'dotenv';
dotenv.config();

const logDir = './logs';
const isProductionEnv: boolean = process.env.NODE_ENV === 'production';

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const logger: Logger = winston.createLogger({
  level: isProductionEnv ? 'error' : 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: `${logDir}/combined.log` })]
});

export default logger;
