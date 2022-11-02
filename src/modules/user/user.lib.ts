import authModel from '../user/user.model';

export class AuthLib {
  public async index(page: number, limit: number): Promise<any> {
    return authModel
      .find()
      .skip(page * limit)
      .limit(limit);
  }
}
