export const typedefs = `#graphql
    scalar JSON
    enum Role {
        ADMIN
        USER
        AGENCY
    }
    type Account {
        id: ID!
        email: String!
        password: String
        role: Role!
        name: String
        phone: String
    }
    type Response {
        statuscode:String!
        message: String!
        data: JSON
        success: Boolean!
    }

`