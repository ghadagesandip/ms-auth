import { Application, NextFunction, Request, Response } from 'express';
// import {
//   ReasonPhrases,
//   StatusCodes
// } from 'http-status-codes';
import * as responsehandler from '../../lib/response-handler';
import BaseApi from '../BaseApi';
import { AuthLib } from './user.lib';

/**
 * Status controller
 */
export default class AuthController extends BaseApi {
  constructor(express: Application) {
    super();
    this.register(express);
  }

  public register(express: Application): void {
    express.use('/api/users', this.router);
    this.router.get('/', this.index);
  }

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = <number>(<unknown>req.query.page) || 0;
      const limit = <number>(<unknown>req.query.limit) || 10;

      const userLib = new AuthLib();
      const userListResponse: any = await userLib.index(page, limit);
      res.locals.data = userListResponse;
      responsehandler.send(res);
    } catch (err) {
      next(err);
    }
  }
}
