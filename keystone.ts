import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import dotenv from 'dotenv';
import { withAuth } from './auth';
import { lists } from './schema';
import { extendGraphqlSchema } from './resolvers/index';

dotenv.config();

export interface Session {
  itemId: string;
  listKey: string;
  data: {
    name: string;
    email: string;
  };
}

const session = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET || 'cookie-dev',
};

export default withAuth(
  config({
    storage: {
      s3_images: {
        kind: 's3',
        type: 'image',
        bucketName: process.env.S3_BUCKET_NAME || '',
        region: process.env.S3_REGION || 'eu-west-3',
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        signed: { expiry: 5000 },
      },
    },
    // -- GraphQL
    graphql: {
      playground: true,
      cors: {
        origin: [
          process.env.FRONTEND_URL || 'http://localhost:3000',
          'https://studio.apollographql.com',
          'http://localhost:3008',
        ],
        credentials: true,
      },
    },
    server: {
      port: Number(process.env.PORT) || 3008,
      cors: {
        origin: [
          process.env.FRONTEND_URL || 'http://localhost:3000',
          'https://studio.apollographql.com',
        ],
        credentials: true,
      },
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true,
    },
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL || 'postgres://localhost/keystone',
    },
    ui: {
      isAccessAllowed: (context): boolean => {
        const activeSession = context.session as Session;
        return !!activeSession?.data;
      },
    },
    lists,
    extendGraphqlSchema,
    session: statelessSessions(session),
  })
);
