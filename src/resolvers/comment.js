const Comment = {
    author: (parent, args, context, info) => {
        return context.db.users.find(user => user.id === parent.authorId);
    },
    post: (parent, args, context, info) => {
        return context.db.posts.find(post => post.id === parent.postId);
    },
};

export { Comment as default };