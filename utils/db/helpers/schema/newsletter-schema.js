export const newsLetterSchema = {
  $jsonSchema: {
    required: ["_id"],
    properties: {
      _id: {
        bsonType: "string",
        description: "Name field is required",
      },
      content: {
        bsonType: "string",
        description: "Content field is required",
      },
      state: {
        minLength: 6,
        maxLength: 9,
        bsonType: "string",
        description: "Account state is optional. 1.Active 2.Inactive",
      },
      schedule: {
        bsonType: "object",
        required: ["startTime", "endTime"],
        properties: {
          startTime: {
            bsonType: "date",
            description: "startTime field is required",
          },
          endTime: {
            bsonType: "date",
            description: "endTime field is required",
          },
        },
      },
    },
  },
};
