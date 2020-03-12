import uuid from 'uuid/v4';

const mutation = {
    createUser: (parent, args, context, info) => {
        const db = context.db;
        const email = args.data.email;
        const exists = db.users.some(user => user.email === email);

        if (exists) {
            throw new Error(`A user already exists with the email address '${email}'.`);
        }

        const user = {
            id: uuid(),
            ...args.data,
        };

        db.users.push(user);

        return user;
    },
    updateUser: (parent, args, context, info) => {
        const db = context.db;
        const id = args.id;
        const name = args.data.name;
        const email = args.data.email;
        const age = args.data.age;
        const user = db.users.find(user => user.id === id);

        if (!user) {
            throw new Error(`No user exists with the id '${id}'.`);
        }

        if (name) {
            user.name = name;
        }

        if (email && email !== user.email) {
            if (db.users.some(user => user.email === email)) {
                throw new Error(`A user already exists with the email '${email}'.`);
            }

            user.email = email;
        }

        if (age) {
            if (age < 0) {
                throw new Error(`Age cannot be a negative number.`);
            }

            user.age = age;
        }

        return user;
    },
    deleteUser: (parent, args, context, info) => {
        const db = context.db;
        const id = args.id;
        const userIndex = db.users.findIndex(user => user.id === id);

        if (userIndex < 0) {
            throw new Error(`No user exists with the id '${id}'.`);
        }

        db.comments = db.comments.filter(comment => comment.authorId === id);

        db.posts = db.posts.filter(post => {
            const match = post.authorId === id;

            if (match) {
                db.comments = db.comments.filter(comment => comment.postId === post.id);
            }

            return !match;
        });

        return db.users.splice(userIndex, 1)[0];
    },
    createPost: (parent, args, context, info) => {
        const db = context.db;
        const authorId = args.data.authorId;
        const exists = db.users.some(user => user.id === authorId);

        if (!exists) {
            throw new Error(`No user exists with the id '${authorId}'.`);
        }

        const post = {
            id: uuid(),
            published: false,
            ...args.data,
        };

        db.posts.push(post);

        return post;
    },
    deletePost: (parent, args, context, info) => {
        const db = context.db;
        const id = args.id;
        const postIndex = db.posts.findIndex(post => post.id === id);

        if (postIndex < 0) {
            throw new Error(`No post exists with the id '${id}'.`);
        }

        db.comments = db.comments.filter(comment => comment.postId === id);

        return db.posts.splice(postIndex, 1)[0];
    },
    createComment: (parent, args, context, info) => {
        const db = context.db;
        const authorId = args.data.authorId;
        const postId = args.data.postId;
        const authorExists = db.users.some(user => user.id === authorId);
        const postExists = db.posts.some(post => post.id === postId);

        if (!authorExists) {
            throw new Error(`No user exists with the id '${authorId}'.`);
        }

        if (!postExists) {
            throw new Error(`No post exists with the id '${postId}'.`);
        }

        const comment = {
            id: uuid(),
            ...args.data,
        };

        db.comments.push(comment);

        return comment;
    },
    deleteComment: (parent, args, context, info) => {
        const db = context.db;
        const id = args.id;
        const commentIndex = db.comments.findIndex(comment => comment.id === id);

        if (commentIndex < 0) {
            throw new Error(`No comment exists with the id '${id}'.`);
        }

        return db.comments.splice(commentIndex, 1)[0];
    },
};

export { mutation as default };