const query = {
    me: (parent, args, context, info) => {
        return context.db.users[0];
    },
    users: (parent, args, context, info) => {
        const { db, includes } = context;
        const { query } = args;

        return !query ? db.users : db.users.filter(user => {
            return includes(user.name, query) || includes(user.email, query);
        });
    },
    posts: (parent, args, context, info) => {
        const { db, includes } = context;
        const { query } = args;

        return !query ? db.posts : db.posts.filter(post => {
            return includes(post.title, query) || includes(post.body, query);
        });
    },
    comments: (parent, args, context, info) => {
        const { db, includes } = context;
        const { query } = args;

        return !query ? db.comments : db.comments.filter(comment => {
            return includes(comment.text, query);
        });
    },
};

export { query as default };