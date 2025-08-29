export const typeDefs = `#graphql

type Query{
    ping: String,
    getUsers: UsersResult,
    getPosts: PostsResult
}

type Mutation {
    register(registerInput: InputRegister): RegistrationResult
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

input InputRegister {
    username: String,
    password: String,
    confirmPassword: String,
    email: String
}

type registrationOutput{
    id: ID!,
    email: String!,
    token: String!,
    username: String!,
    createdAt: String!
}

type RegistrationResult {
    message: String,
    httpStatusCode: Int,
    data: registrationOutput
}

`;
