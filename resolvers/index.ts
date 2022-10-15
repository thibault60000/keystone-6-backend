import { graphQLSchemaExtension } from '@keystone-6/core';

// -- Mutations

// -- Queries

const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql``,
  resolvers: {},
});
