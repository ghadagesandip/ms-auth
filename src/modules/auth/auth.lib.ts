import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import authModel from '../user/user.model';

interface IUserType extends Object {
  password: string;
}

export default class AuthLib {
  public async generateHash(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }

  public async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }

  public async saveUser(userData: IUserType): Promise<any> {
    userData.password = await this.generateHash(userData.password);
    // eslint-disable-next-line new-cap
    const userObj = new authModel(userData);
    return userObj.save();
  }

  public async getUserByEmail(email: string): Promise<any> {
    return authModel.findOne({ email }, '+password');
  }

  public async loginUserAndCreateToken(email: string, password: string): Promise<any> {
    const userData: any = await this.getUserByEmail(email);
    if (userData !== null) {
      const isValidPass: boolean = await this.comparePassword(password, userData.password);
      if (isValidPass) {
        const PASSWORD_SECRET = <string>process.env.PASSWORD_SECRET;
        userData.password = undefined;
        const token = jwt.sign({ id: userData._id, userRole: userData.userRole, jti: 'test' }, PASSWORD_SECRET, {
          expiresIn: '24h'
        });

        return { userData, token };
      }
      throw new Error('INVALID_CREDENTIALS');
    } else {
      throw new Error('INVALID_CREDENTIALS');
    }
  }
}
