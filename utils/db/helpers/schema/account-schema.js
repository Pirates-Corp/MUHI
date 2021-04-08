export const accountSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: [
      '_id',
      'name',
      'email',
      'password',
      'state',
      'role',
      'accountType'
    ],
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: 'string',
      },
      name: {
        maxLength: 50,
        bsonType: 'string',
      },
      email: {
        maxLength: 60,
        bsonType: 'string'
      },
      password: {
        minLength: 6,
        bsonType: 'string'
      },
      mobileNo: {
        minLength: 5,
        maxLength: 15,
        bsonType: 'string'
      },
      state: {
        minLength: 6,
        maxLength: 9,
        bsonType: 'string',
        description: '1.Active 2.Inactive'
      },
      role: {
        minLength: 4,
        maxLength: 9,
        bsonType: 'string',
        description: '1.admin 2.moderator 3.user'
      },
      accountType: {
        minLength: 4,
        maxLength: 9,
        bsonType: 'string',
        description: '1.muhi 2,google 3.guest default : anonymous'
      },
      resetToken: {
        bsonType: 'string'
      },
      lastLogin: {
        bsonType: 'number'
      }
    }
  }
}
