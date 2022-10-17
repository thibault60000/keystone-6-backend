import { config } from '@keystone-6/core';
import { withAuth, session } from './auth';
import { lists } from './schema';
import { extendGraphqlSchema } from './resolvers/index';

export default withAuth(
  config({
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
