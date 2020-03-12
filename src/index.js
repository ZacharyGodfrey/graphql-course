import { GraphQLServer } from 'graphql-yoga';
import uuid from 'uuid/v4';

const typeDefs = `
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

    type Query {
        me: User!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int!
    }

    input CreatePostInput {
        title: String!
        body: String!
        authorId: ID!
    }

    input CreateCommentInput {
        text: String!
        authorId: ID!
        postId: ID!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
    }
`;

const users = [
    {
        id: 'aa82955e-ada4-4668-8330-4c7344d01070',
        name: 'First User',
        email: 'user1@test.null',
        age: 21,
    },
    {
        id: 'aa82955e-ada4-4668-8330-4c7344d01071',
        name: 'Second User',
        email: 'user2@test.null',
        age: 22,
    },
    {
        id: 'aa82955e-ada4-4668-8330-4c7344d01072',
        name: 'Third User',
        email: 'user3@test.null',
        age: 23,
    }
];

const posts = [
    {
        id: 'c7a8a60d-678b-4f42-b15c-c029b737bd9d',
        title: 'First Post',
        body: 'This is the first post.',
        published: true,
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01070',
    },
    {
        id: 'c7a8a60d-678b-4f42-b15c-c029b737bd9e',
        title: 'Second Post',
        body: 'This is the second post.',
        published: false,
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01071',
    },
    {
        id: 'c7a8a60d-678b-4f42-b15c-c029b737bd9f',
        title: 'Third Post',
        body: 'This is the third post.',
        published: false,
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01072',
    }
];

const comments = [
    {
        id: 'ff6f8f91-a5aa-48d3-937c-1d9dd1708fc7',
        text: 'This is the first comment.',
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01072',
        postId: 'c7a8a60d-678b-4f42-b15c-c029b737bd9d'
    },
    {
        id: 'ff6f8f91-a5aa-48d3-937c-1d9dd1708fc8',
        text: 'This is the second comment.',
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01070',
        postId: 'c7a8a60d-678b-4f42-b15c-c029b737bd9e'
    },
    {
        id: 'ff6f8f91-a5aa-48d3-937c-1d9dd1708fc9',
        text: 'This is the third comment.',
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01071',
        postId: 'c7a8a60d-678b-4f42-b15c-c029b737bd9f'
    }
];

const includes = (a, b) => a.toLowerCase().includes(b.toLowerCase());

const resolvers = {
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
    },
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
    Mutation: {
        createUser: (parent, args, context, info) => {
            const { email } = { ...args.data };
            const exists = users.some(x => x.email === email);

            if (exists) {
                throw new Error(`A user already exists with the email address '${email}'.`);
            } else {
                const user = {
                    id: uuid(),
                    ...args.data,
                };

                users.push(user);

                return user;
            }
        },
        createPost: (parent, args, context, info) => {
            const { authorId } = { ...args.data };
            const exists = users.some(x => x.id === authorId);

            if (!exists) {
                throw new Error(`No user exists with the id '${authorId}'.`);
            } else {
                const post = {
                    id: uuid(),
                    published: false,
                    ...args.data,
                };

                posts.push(post);

                return post;
            }
        },
        createComment: (parent, args, context, info) => {
            const { authorId, postId } = { ...args.data };
            const authorExists = users.some(x => x.id === authorId);
            const postExists = posts.some(x => x.id === postId);

            if (!authorExists) {
                throw new Error(`No user exists with the id '${authorId}'.`);
            } else if (!postExists) {
                throw new Error(`No post exists with the id '${postId}'.`);
            } else {
                const comment = {
                    id: uuid(),
                    ...args.data,
                };

                comments.push(comment);

                return comment;
            }
        },
    }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
    console.log(`GraphQL server is running...`);
});