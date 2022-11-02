import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from './logger';

function send(res: Response, statusCode: number = StatusCodes.OK): void {
  let obj = {};
  obj = res.locals.data;
  logger.info(JSON.stringify(obj, null, 2));
  res.status(statusCode).send(obj);
}

function json(res: Response, statusCode: number = StatusCodes.OK): void {
  let obj = {};
  obj = res.locals.data;
  res.status(statusCode).json(obj);
}

export { send, json };
