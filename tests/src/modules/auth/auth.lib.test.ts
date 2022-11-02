import AuthLib from '../../../../src/modules/auth/auth.lib';
jest.mock('../../../../src/modules/user/user.model');
jest.mock('bcrypt');

beforeEach(() => {
  jest.setTimeout(100000);
});

describe('Auth Lib', () => {
  it('should called generateHash ', async () => {
    const authLib = new AuthLib();
    const passString = 'abc';
    const returnValue = `hashed-${passString}`;
    const rs = await authLib.generateHash(passString);
    expect(rs).toBe(returnValue);
  });

  it('should called getUserByEmail ', async () => {
    const authLib = new AuthLib();
    const email = 'sandip@check.com';
    const returnValue = { email: 'sandp@check.com', password: 'checkpass' };
    const rs = await authLib.getUserByEmail(email);
    expect(rs).toEqual(returnValue);
  });
});

afterEach(() => {
  jest.clearAllTimers();
});
