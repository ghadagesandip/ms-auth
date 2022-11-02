import * as express from 'express';
import AuthController from './modules/auth/auth.controller';
import UserController from './modules/user/user.controller';

export default function registerRoutes(app: express.Application): void {
  new AuthController(app);
  new UserController(app);
}
