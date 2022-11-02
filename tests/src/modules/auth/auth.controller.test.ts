import express, { Request, Response } from 'express';
import AuthController from '../../../../src/modules/auth/auth.controller';

jest.mock('../../../../src/modules/auth/auth.lib');
jest.mock('../../../../src/lib/response-handler');

beforeEach(() => {
  jest.useFakeTimers();
  jest.setTimeout(100000);
});

describe('Auth controller', () => {
  const app = express();
  const authController = new AuthController(app);
  it('should able to login ', async () => {
    const mReq: any = {
      body: {
        email: 'sandip.ghadg@test.com',
        password: 'check'
      }
    } as Request;
    let responseObj = {};
    let responseStatus = 0;
    const expectedResponse = {
      userData: { email: 'sandip.ghadg@test.com', first_name: 'Sandip' },
      token: 'secret_token_goes_here'
    };
    const expectedStatus = 200;

    const mRes: Partial<Response> = {
      status: jest.fn().mockImplementation((result) => {
        responseStatus = result;
      }),
      send: jest.fn().mockImplementation((result) => {
        responseObj = result;
      }),
      locals: {
        data: jest.fn().mockImplementation((result) => {
          responseObj = result;
        })
      }
    };
    const mNext = jest.fn();

    await authController.login(mReq as Request, mRes as Response, mNext);
    expect(responseObj).toHaveProperty('userData');
    expect(responseObj).toEqual(expectedResponse);
    expect(responseStatus).toEqual(expectedStatus);
  });

  it('login should be failed ', async () => {
    const mReq: any = {
      body: {
        email: 'sandip.ghadg@test.com',
        password: ''
      }
    };
    let responseObj = { message: 'err' };
    let responseStatus = 0;

    const mRes: any = {
      status: jest.fn().mockImplementation((result) => {
        responseStatus = result;
      }),
      send: jest.fn().mockImplementation((result) => {
        responseObj = result;
      }),
      locals: {
        data: jest.fn().mockImplementation((result) => {
          responseObj = result;
        })
      }
    };
    const mNext = jest.fn();
    await authController.login(mReq, mRes, mNext);
    expect(responseObj).toHaveProperty('message');
    expect(responseStatus).toEqual(401);
  });

  it('should able to signup ', async () => {});
});

afterEach(() => {
  jest.clearAllTimers();
});
