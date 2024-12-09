export const typedefs = `#graphql
    input DigitalCardInput{
        name:String!,
        phone:String!,
        address:String!,
        document:String,
        latitude:Float,
        longitude:Float,
    }
`