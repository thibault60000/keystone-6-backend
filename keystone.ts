import { config } from '@keystone-6/core';
import dotenv from 'dotenv';
import { withAuth, session } from './auth';
import { lists } from './schema';
import { extendGraphqlSchema } from './resolvers/index';

const baseUrl = process.env.BASE_URL || 'http://localhost:3008';

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
          process.env.FRONTEND_URL || false,
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
          process.env.FRONTEND_URL || 'http://localhost:7777',
          'https://studio.apollographql.com',
        ],
        credentials: true,
      },
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true,
    },
    db: {
      provider: 'postgresql',
      enableLogging: true,
      url: process.env.DATABASE_URL || '',
      // TODO : Add seed data on 'onConnect' method
    },
    ui: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    extendGraphqlSchema,
    session,
  })
);
