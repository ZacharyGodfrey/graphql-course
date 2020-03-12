let users = [
    {
        id: 'aa82955e-ada4-4668-8330-4c7344d01070',
        name: 'First User',
        email: 'user1@test.null',
        age: 21,
    },
    {
        id: 'aa82955e-ada4-4668-8330-4c7344d01071',
        name: 'Second User',
        email: 'user2@test.null',
        age: 22,
    },
    {
        id: 'aa82955e-ada4-4668-8330-4c7344d01072',
        name: 'Third User',
        email: 'user3@test.null',
        age: 23,
    }
];

let posts = [
    {
        id: 'c7a8a60d-678b-4f42-b15c-c029b737bd9d',
        title: 'First Post',
        body: 'This is the first post.',
        published: true,
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01070',
    },
    {
        id: 'c7a8a60d-678b-4f42-b15c-c029b737bd9e',
        title: 'Second Post',
        body: 'This is the second post.',
        published: false,
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01071',
    },
    {
        id: 'c7a8a60d-678b-4f42-b15c-c029b737bd9f',
        title: 'Third Post',
        body: 'This is the third post.',
        published: false,
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01072',
    }
];

let comments = [
    {
        id: 'ff6f8f91-a5aa-48d3-937c-1d9dd1708fc7',
        text: 'This is the first comment.',
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01072',
        postId: 'c7a8a60d-678b-4f42-b15c-c029b737bd9d'
    },
    {
        id: 'ff6f8f91-a5aa-48d3-937c-1d9dd1708fc8',
        text: 'This is the second comment.',
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01070',
        postId: 'c7a8a60d-678b-4f42-b15c-c029b737bd9e'
    },
    {
        id: 'ff6f8f91-a5aa-48d3-937c-1d9dd1708fc9',
        text: 'This is the third comment.',
        authorId: 'aa82955e-ada4-4668-8330-4c7344d01071',
        postId: 'c7a8a60d-678b-4f42-b15c-c029b737bd9f'
    }
];

const db = {
    users,
    posts,
    comments,
};

export { db as default };