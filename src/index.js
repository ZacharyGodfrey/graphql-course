import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        now: String!
    }
`;

const resolvers = {
    Query: {
        now: () => new Date().toISOString(),
    }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(`GraphQL server is running...`));