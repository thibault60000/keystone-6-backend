import { createAuth } from '@keystone-6/auth';
import 'dotenv/config';
import { sendPasswordResetEmail } from './lib/mail';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  sessionData: `name email`,
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

export { withAuth };
