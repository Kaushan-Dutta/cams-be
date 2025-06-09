export const typedefs = `#graphql
    input DigitalCardInput{
        name:String!,
        phone:String!,
        document:String,
        latitude:String!,
        longitude:String!,
        gender:Gender!,
        dob:String!,
    },
    enum Gender {
        MALE
        FEMALE
        OTHER
    }

`