const Subscription = {
    now: {
        subscribe: (parent, args, context, info) => {
            setInterval(() => {
                context.pubsub.publish('now', {
                    now: new Date().toISOString()
                });
            }, 1000);

            return context.pubsub.asyncIterator('now');
        },
    },
};

export { Subscription as default };