import { GraphQLServer, PubSub } from 'graphql-yoga';
import Database from './database';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import Subscription from './resolvers/subscription';
import User from './resolvers/user';
import Post from './resolvers/post';
import Comment from './resolvers/comment';

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment,
    },
    context: {
        db: Database,
        pubsub: new PubSub(),
        includes: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
    },
});

server.start(() => {
    console.log(`GraphQL server is running...`);
});