import cors from 'cors';
import express from 'express';
import * as http from 'http';
import helmet from 'helmet';
import { connect } from 'mongoose';

import registerRoutes from './routes';
import dotenv from 'dotenv';
dotenv.config();

export default class App {
  public express: express.Application;

  public httpServer: http.Server;

  constructor() {
    this.express = express();
    this.httpServer = http.createServer(this.express);
  }

  public async init(): Promise<void> {
    this.mongoSetup();
    this.middleware();
    this.routes();
  }

  /**
   * here register your all routes
   */
  private routes(): void {
    this.express.get('/', this.basePathRoute);
    registerRoutes(this.express);
    this.express.use('/coverage', express.static('coverage/lcov-report'));
  }

  /**
   * here you can apply your middlewares
   */
  private middleware(): void {
    // support application/json type post data
    // support application/x-www-form-urlencoded post data
    // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
    this.express.use(helmet());
    this.express.use(express.json({ limit: '100mb' }));
    this.express.use(express.urlencoded({ limit: '100mb', extended: true }));
    this.express.use(cors());
  }

  private basePathRoute(request: express.Request, response: express.Response): void {
    response.json({ message: 'auth server is up and running.' });
  }

  private async mongoSetup(): Promise<void> {
    const url = <string>process.env.MONGO_URL;
    try {
      console.log('Mongo connected');
      await connect(url);
    } catch (err) {
      console.log('err', err);
    }
  }
}
