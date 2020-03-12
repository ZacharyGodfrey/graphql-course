const user = {
    posts: (parent, args, context, info) => {
        const { db } = context;

        return db.posts.filter(post => post.authorId === parent.id);
    },
    comments: (parent, args, context, info) => {
        const { db } = context;

        return db.comments.filter(comment => comment.authorId === parent.id);
    },
};

export { user as default };