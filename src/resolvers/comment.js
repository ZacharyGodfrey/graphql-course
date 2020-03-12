const comment = {
    author: (parent, args, context, info) => {
        const { db } = context;

        return db.users.find(user => user.id === parent.authorId);
    },
    post: (parent, args, context, info) => {
        const { db } = context;

        return db.posts.find(post => post.id === parent.postId);
    },
};

export { comment as default };