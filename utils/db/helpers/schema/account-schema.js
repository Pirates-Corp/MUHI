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
                description: "Account state is optional. 1.active 2.inactive"
            },
            role: {
                minLength: 4,
                maxLength: 9,
                bsonType: "string",
                description: "User role is optional. 1.admin 2.moderator 3.user"
            },
            accountType: {
                minLength: 4,
                maxLength: 9,
                bsonType: "string",
                description: "Account type is optional. 1.muhi 2,google 3.guest default : anonymous"
            },
            resetToken : {
                bsonType: "string",
                description: "reset token is optional"
            },
            lastLogin : {
                bsonType: "date",
                description: "lastActiveTime is optional"
            }
        }
    }
}