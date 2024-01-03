
// Third-party imports
import crypto from 'crypto';
import { TUser } from '../../type/user';

// Custom imports
type verifyPasswordArgs = {
      user: TUser,
      password: string
}

export const verifyPassword = async ({ user, password }: verifyPasswordArgs) => {
      const hash = crypto.pbkdf2Sync(password, user?.salt, 1000, 64, 'sha512').toString('hex');
      //logger.info(`Password verification for ${user?.email} , hash generated`)
      return hash === user?.password;
}