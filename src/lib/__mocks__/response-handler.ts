import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

function send(res: Response, statusCode: number = StatusCodes.OK): void {
  let obj = {};
  obj = res.locals.data;
  res.send(obj);
  res.status(statusCode);
}

function json(res: Response, statusCode: number = StatusCodes.OK): void {
  let obj = {};
  obj = res.locals.data;
  // logger.info(JSON.stringify(obj, null, 2));
  res.send(obj);
  res.status(statusCode);
}

export { send, json };
