import { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// import {
//   ReasonPhrases,
//   StatusCodes
// } from 'http-status-codes';
import { send } from '../../lib/response-handler';
// import ApiError from '../../abstractions/ApiError';
import BaseApi from '../BaseApi';
import AuthLib from './auth.lib';

/**
 * Status controller
 */
export default class AuthController extends BaseApi {
  constructor(express: Application) {
    super();
    this.register(express);
  }

  public register(express: Application): void {
    express.use('/api/auth', this.router);
    this.router.post('/signin', this.login);
    this.router.post('/signup', this.signup);
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userLib = new AuthLib();
      const { email, password } = req.body;
      if (email !== '' && password !== '') {
        const loggedInUser: any = await userLib.loginUserAndCreateToken(email, password);
        res.locals.data = loggedInUser;
        send(res);
      } else {
        throw Error('Not valid credentials');
      }
    } catch (err) {
      res.locals.data = { message: err + '' };
      send(res, StatusCodes.UNAUTHORIZED);
    }
  }

  public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userLib = new AuthLib();
      const userResult = await userLib.saveUser(req.body);
      userResult.password = undefined;
      res.locals.data = userResult;
      send(res);
    } catch (err) {
      next(err);
    }
  }
}
