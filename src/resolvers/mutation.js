import uuidv4 from 'uuid/v4';

const mutation = {
    createUser: (parent, args, context, info) => {
        const {
            email,
            name,
            age,
        } = args.data;

        const exists = context.db.users.some(user => user.email === email);

        if (exists) {
            throw new Error(`A user already exists with the email address '${email}'.`);
        }

        const user = {
            id: uuidv4(),
            email,
            name,
            age,
        };

        context.db.users.push(user);

        return user;
    },
    updateUser: (parent, args, context, info) => {
        const {
            id,
            name,
            email,
            age,
        } = args.data;

        const user = context.db.users.find(user => user.id === id);

        if (!user) {
            throw new Error(`No user exists with the id '${id}'.`);
        }

        if (name !== null && name.length > 0) {
            user.name = name;
        }

        if (email !== null && email.length > 0 && email !== user.email) {
            if (context.db.users.some(user => user.email === email)) {
                throw new Error(`A user already exists with the email '${email}'.`);
            }

            user.email = email;
        }

        if (age !== null) {
            if (age < 0) {
                throw new Error(`Age cannot be a negative number.`);
            }

            user.age = age;
        }

        return user;
    },
    deleteUser: (parent, args, context, info) => {
        const id = args.id;
        const userIndex = context.db.users.findIndex(user => user.id === id);

        if (userIndex < 0) {
            throw new Error(`No user exists with the id '${id}'.`);
        }

        context.db.comments = context.db.comments.filter(comment => {
            return comment.authorId === id;
        });

        context.db.posts = context.db.posts.filter(post => {
            const match = post.authorId === id;

            if (match) {
                context.db.comments = context.db.comments.filter(comment => {
                    return comment.postId === post.id;
                });
            }

            return !match;
        });

        return context.db.users.splice(userIndex, 1)[0];
    },
    createPost: (parent, args, context, info) => {
        const {
            authorId,
            title,
            body,
        } = args.data;

        const authorExists = context.db.users.some(user => user.id === authorId);

        if (!authorExists) {
            throw new Error(`No user exists with the id '${authorId}'.`);
        }

        const post = {
            id: uuidv4(),
            authorId,
            title,
            body,
            published: false,
        };

        context.db.posts.push(post);

        return post;
    },
    updatePost: (parent, args, context, info) => {
        const {
            id,
            title,
            body,
            published,
        } = args.data;

        const post = context.db.posts.find(post => post.id === id);

        if (!post) {
            throw new Error(`No post exists with the id '${id}'.`);
        }

        if (title !== null && title.length > 0) {
            post.title = title;
        }

        if (body !== null && body.length > 0) {
            post.body = body;
        }

        if (published !== null) {
            post.published = published;
        }

        return post;
    },
    deletePost: (parent, args, context, info) => {
        const id = args.id;
        const postIndex = context.db.posts.findIndex(post => post.id === id);

        if (postIndex < 0) {
            throw new Error(`No post exists with the id '${id}'.`);
        }

        context.db.comments = context.db.comments.filter(comment => comment.postId === id);

        return context.db.posts.splice(postIndex, 1)[0];
    },
    createComment: (parent, args, context, info) => {
        const {
            authorId,
            postId,
            text,
        } = args.data;

        const authorExists = context.db.users.some(user => user.id === authorId);
        const postExists = context.db.posts.some(post => post.id === postId);

        if (!authorExists) {
            throw new Error(`No user exists with the id '${authorId}'.`);
        }

        if (!postExists) {
            throw new Error(`No post exists with the id '${postId}'.`);
        }

        const comment = {
            id: uuidv4(),
            authorId,
            postId,
            text,
        };

        context.db.comments.push(comment);

        return comment;
    },
    updateComment: (parent, args, context, info) => {
        const {
            id,
            text,
        } = args.data;

        const comment = context.db.comments.find(comment => comment.id === id);

        if (!comment) {
            throw new Error(`No comment exists with the id '${id}'.`);
        }

        if (text !== null && text.length > 0) {
            comment.text = text;
        }

        return comment;
    },
    deleteComment: (parent, args, context, info) => {
        const id = args.id;
        const commentIndex = context.db.comments.findIndex(comment => comment.id === id);

        if (commentIndex < 0) {
            throw new Error(`No comment exists with the id '${id}'.`);
        }

        return context.db.comments.splice(commentIndex, 1)[0];
    },
};

export { mutation as default };