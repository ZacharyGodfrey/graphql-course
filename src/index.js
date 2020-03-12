import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import User from './resolvers/user';
import Post from './resolvers/post';
import Comment from './resolvers/comment';

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment,
    },
    context: {
        db,
        includes: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
    },
});

server.start(() => {
    console.log(`GraphQL server is running...`);
});