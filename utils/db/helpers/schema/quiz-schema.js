export const quizSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: [
      "_id",
      "title",
      "quizTag",
      "state",
      "schedule",
      "totalMarks",
      "questions",
    ],
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: "string",
      },
      title: {
        bsonType: "string",
      },
      duration :{
        bsonType : "number",

      },
      quizTag: {
        bsonType: "string",
      },
      state: {
        minLength: 6,
        maxLength: 9,
        bsonType: "string",
        description: " 1.Active 2.Inactive",
      },
      
      schedule: {
        bsonType: "object",
        required: ["startTime", "endTime"],
        additionalProperties: false,
        properties: {
          startTime: {
            bsonType: "number",
            description: "should be given in millis",
          },
          endTime: {
            bsonType: "number",
            description: "should be given in millis",
          },
        },
      },
      totalMarks: {
        bsonType: "number",
      },
      questions: {
        bsonType: "array",
        uniqueItems: true,
        additionalItems: false,
        items: {
          bsonType: ["object"],
          required: [
            "id",
            "question",
            "options",
            "correctAnswer",
            "chapter",
            "section",
            "syllabus",
          ],
          additionalProperties: false,
          properties: {
            id: {
              bsonType: "number",
            },
            question: {
              bsonType: "string",
            },
            options: {
              bsonType: "array",
              uniqueItems: true,
              additionalItems: false,
              items: {
                bsonType: ["string"]
              },
            },
            correctAnswer: {
              bsonType: "string",
            },
            chapter : {
              bsonType: "string",
            },
            section : {
              bsonType: "string",
            },
            syllabus : {
              bsonType: "string",
            }
          },
        },
      },
    },
  },
};
