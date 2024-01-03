
// Third-party imports
import jwt from 'jsonwebtoken';

// Custom imports
import { Settings } from '../config/settings';
import logger from './Logging';

export const tokenVerify = (token: string): string => {
      if (token.length < 1) return ''

      let user_id = ""

      jwt.verify(token, Settings.auth.JWT_SECRET_KEY as string, (err: any, decoded: any) => {
            if (err) console.log(err)
            user_id = decoded?.user_id

            console.log("decoded", decoded)
      })

      logger.info(`Token verification for ${user_id}`)
      return user_id
};