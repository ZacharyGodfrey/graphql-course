const User = {
    posts: (parent, args, context, info) => {
        return context.db.posts.filter(post => post.authorId === parent.id);
    },
    comments: (parent, args, context, info) => {
        return context.db.comments.filter(comment => comment.authorId === parent.id);
    },
};

export { User as default };