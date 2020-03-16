const Subscription = {
    comment: {
        subscribe: (parent, args, context, info) => {
            const { postId } = args;
            const post = context.db.posts.find(post => post.id === postId);

            if (!post || !post.published) {
                throw new Error(`No published post exists with the id '${postId}'.`);
            }

            return pubsub.asyncIterator(`comment:${postId}`);
        },
    },
    post: {
        subscribe: (parent, args, context, info) => {
            return context.pubsub.asyncIterator(`post`);
        },
    }
};

export { Subscription as default };