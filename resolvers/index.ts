import { graphQLSchemaExtension } from '@keystone-6/core';

// -- Mutations

// -- Queries

const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      # TODO
    }
    type Query {
      # TODO
    }
  `,
  resolvers: {
    Mutation: {
      // TODO
    },
    Query: {
      // TODO
    },
  },
});
