export const accountSchema = {
    $jsonSchema: {
        required: ["name", "_id", "password", "mobileNo", "accountState", "role", "resetToken", "accountType"],
        properties: {
            name: {
                maxLength: 50,
                bsonType: "string",
                description: "Name field is required"
            },
            _id: {
                maxLength: 50,
                bsonType: "string",
                description: "Mail is required"
            },
            password: {
                minLength: 6,
                maxLength: 16,
                bsonType: "string",
                description: "Password is required"
            },
            mobileNo: {
                minLength: 5,
                maxLength: 15,
                bsonType: "long",
                description: "Mobile number is required"
            },
            accountState: {
                bsonType: "bool",
                description: "Account state is required"
            },
            role: {
                minLength: 5,
                maxLength: 9,
                bsonType: "string",
                description: "User role is required"
            },
            accountType: {
                minLength: 4,
                maxLength: 6,
                bsonType: "string",
                description: "Account type is required"
            }
        }
    }
}