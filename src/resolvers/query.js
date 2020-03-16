const Query = {
    me: (parent, args, context, info) => {
        return context.db.users[0];
    },
    users: (parent, args, context, info) => {
        const { db, includes } = context;

        return !args.query ? db.users : db.users.filter(user => {
            return includes(user.name, args.query) || includes(user.email, args.query);
        });
    },
    posts: (parent, args, context, info) => {
        const { db, includes } = context;

        return !args.query ? db.posts : db.posts.filter(post => {
            return includes(post.title, args.query) || includes(post.body, args.query);
        });
    },
    comments: (parent, args, context, info) => {
        const { db, includes } = context;

        return !args.query ? db.comments : db.comments.filter(comment => {
            return includes(comment.text, args.query);
        });
    },
};

export { Query as default };