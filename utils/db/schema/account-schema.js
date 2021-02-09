export const accountSchema = {
    $jsonSchema: {
        required: ["_id"],
        additionalProperties:false,
        properties: {
            _id : {
                bsonType: "string",
                description: "Name field is required"
            },
            name: {
                maxLength: 50,
                bsonType: "string",
                description: "Name field is optional"
            },
            email : {
                minLength: 10,
                maxLength: 50,
                bsonType: "string",
                description: "Name field is required"
            },
            password: {
                minLength: 6,
                bsonType: "string",
                description: "Password is optional"
            },
            mobileNo: {
                minLength: 5,
                maxLength: 15,
                bsonType: "string",
                description: "Mobile number is optional"
            },
            accountState: {
                minLength: 6,
                maxLength: 9,
                bsonType: "string",
                description: "Account state is optional"
            },
            role: {
                minLength: 4,
                maxLength: 9,
                bsonType: "string",
                description: "User role is optional"
            },
            accountType: {
                minLength: 4,
                maxLength: 6,
                bsonType: "string",
                description: "Account type is optional"
            },
            resetToken : {
                bsonType: "string",
                description: "reset token is optional"
            }
        }
    }
}