import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
import 'dotenv/config';
import { sendPasswordResetEmail } from './lib/mail';

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production'
    );
  } else {
    sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
  }
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    async sendToken(args) {
      /*
        itemId '24324324325R1',
        identity: 'test@gmail.com',
        token: '908501232141'
      */
      const { token, identity } = args;
      await sendPasswordResetEmail(token, identity);
    },
  },
});

const sessionMaxAge = 60 * 60 * 24 * 360;

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret || 'cookie-dev',
});

export { withAuth, session };
