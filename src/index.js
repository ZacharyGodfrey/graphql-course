import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        me: User!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        authorId: '1',
    },
    {
        id: '2',
        title: 'Second Post',
        body: 'Second post content. Draft.',
        published: false,
        authorId: '2',
    },
    {
        id: '3',
        title: 'Third Post',
        body: 'Third post content. Draft.',
        published: false,
        authorId: '2',
    }
];

const comments = [
    {
        id: '1',
        text: 'This is a comment.',
        authorId: '3',
        postId: '3'
    },
    {
        id: '2',
        text: 'This is another comment.',
        authorId: '2',
        postId: '1'
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
        comments: (parent, args, context, info) => {
            const { query } = args;
            const data = comments;

            return !query ? data : data.filter(x => {
                return includes(x.text, query);
            });
        },
    },
    User: {
        posts: (parent, args, context, info) => {
            return posts.filter(x => {
                return x.authorId === parent.id;
            });
        },
        comments: (parent, args, context, info) => {
            return comments.filter(x => {
                return x.authorId === parent.id;
            });
        },
    },
    Post: {
        author: (parent, args, context, info) => {
            return users.find(x => x.id === parent.authorId);
        },
        comments: (parent, args, context, info) => {
            return comments.filter(x => {
                return x.postId === parent.id;
            });
        },
    },
    Comment: {
        author: (parent, args, context, info) => {
            return users.find(x => x.id === parent.authorId);
        },
        post: (parent, args, context, info) => {
            return posts.find(x => x.id === parent.postId);
        },
    }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
    console.log(`GraphQL server is running...`);
});