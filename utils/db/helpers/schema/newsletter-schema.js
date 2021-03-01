export const newsLetterSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id","title","content","state","schedule"],
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: "string"
      },
      title: {
        bsonType: "string"
      },
      content: {
        bsonType: "string"
      },
      state: {
        bsonType: "string",
        description: "1.Active 2.Inactive"
      },
      schedule: {
        bsonType: "object",
        required: ["startTime", "endTime"],
        additionalProperties: false,
        properties: {
          startTime: {
            bsonType: "number",
            description: "startTime should be given in millis"
          },
          endTime: {
            bsonType: "number",
            description: "endTime should be given in millis"
          },
        },
      },
    },
  },
};
