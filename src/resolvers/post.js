const Post = {
    author: (parent, args, context, info) => {
        return context.db.users.find(user => user.id === parent.authorId);
    },
    comments: (parent, args, context, info) => {
        return context.db.comments.filter(comment => comment.postId === parent.id);
    },
};

export { Post as default };