import { graphQLSchemaExtension } from '@keystone-6/core';

import confirmBooking from './mutations/confirmBooking';

const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      confirmBooking(giftId: ID!): Boolean
    }
  `,
  resolvers: {
    Mutation: {
      confirmBooking,
    },
  },
});
