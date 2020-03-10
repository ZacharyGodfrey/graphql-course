import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        me: User!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

const users = [
    {
        id: '1',
        name: 'Test User 1',
        email: 'test1@test.com',
        age: 25,
    },
    {
        id: '2',
        name: 'Test User 2',
        email: 'test2@test.com',
        age: 30,
    },
    {
        id: '3',
        name: 'Test User 3',
        email: 'test3@test.com',
        age: 35,
    }
];

const posts = [
    {
        id: '1',
        title: 'First Post',
        body: 'First post content.',
        published: true,
    },
    {
        id: '2',
        title: 'Second Post',
        body: 'Second post content. Draft.',
        published: false,
    },
    {
        id: '3',
        title: 'Third Post',
        body: 'Third post content. Draft.',
        published: false,
    }
];

const includes = (a, b) => a.toLowerCase().includes(b.toLowerCase());

const resolvers = {
    Query: {
        me: (parent, args, context, info) => {
            return users[0];
        },
        users: (parent, args, context, info) => {
            const { query } = args;
            const data = users;

            return !query ? data : data.filter(x => {
                return includes(x.name, query) || includes(x.email, query);
            });
        },
        posts: (parent, args, context, info) => {
            const { query } = args;
            const data = posts;

            return !query ? data : data.filter(x => {
                return includes(x.title, query) || includes(x.body, query);
            });
        },
    }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
    console.log(`GraphQL server is running...`);
});