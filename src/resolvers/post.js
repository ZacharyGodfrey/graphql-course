const post = {
    author: (parent, args, context, info) => {
        const { db } = context;

        return db.users.find(user => user.id === parent.authorId);
    },
    comments: (parent, args, context, info) => {
        const { db } = context;

        return db.comments.filter(comment => comment.postId === parent.id);
    },
};

export { post as default };