import * as bcrypt from 'bcrypt';
import { bcryptConstants } from '../constants/bcrypt';

export class BcryptFunction {
  static async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(
      password,
      bcryptConstants.saltOrRounds,
    );
    return hashedPassword;
  }

  static hashPasswordSync(password: string) {
    const hashedPassword = bcrypt.hashSync(
      password,
      bcryptConstants.saltOrRounds,
    );
    return hashedPassword;
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }
}
