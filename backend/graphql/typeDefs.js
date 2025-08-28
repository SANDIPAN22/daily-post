export const typeDefs = `#graphql

type Query{
    ping: String,
    getUsers: UsersResult,
    getPosts: PostsResult
}

type User {
    username: String,
    password: String,
    email: String,
    createdAt: String,
}
type UsersResult {
    message: String,
    httpStatusCode: Int,
    data: [User]
}

type Post {
    body: String,
    username: String,
    createdAt: String,
}

type PostsResult {
    message: String,
    httpStatusCode: Int,
    data: [Post]
}



`;
