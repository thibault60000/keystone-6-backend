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
        itemId: The ID of the user requesting the password reset.
        identity: The identity value provided to the sendUserPasswordResetLink mutation.
        token: The token the user must supply to use redeemUserPasswordResetToken.
        context: A KeystoneContext object.
      */
      const { token, identity } = args;
      await sendPasswordResetEmail(token, identity);
    },
    tokensValidForMins: 2 * 60, // default 10 minutes
  },
});

export { withAuth };
