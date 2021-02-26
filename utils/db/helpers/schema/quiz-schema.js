export const quizSchema = {
  $jsonSchema: {
    required: ["_id"],
    properties: {
      _id: {
        bsonType: "string",
        description: "Name field is required",
      },
      quizTag: {
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
      totalMarks: {
        bsonType: "int",
        description: "totalMarks field is required",
      },
      questions: {
        bsonType: "array",
        uniqueItems: true,
        items: {
          bsonType: ["object"],
          required: [
            "qNo",
            "question",
            "options",
            "correctAnswer",
            "chapter",
            "section",
            "syllabus",
          ],
          properties: {
            qNo: {
              bsonType: "int",
              description: "question number is required",
            },
            question: {
              bsonType: "string",
              description: "question is a required ",
            },
            options: {
              bsonType: "array",
              uniqueItems: true,
              items: {
                bsonType: ["object"],
                required: ["option"],
                properties: {
                  option: {
                    bsonType: "string",
                    description: "options is a required ",
                  },
                },
              },
            },
            correctOption: {
              bsonType: "string",
              description: "correctOption is a required ",
            },
          },
        },
      },
    },
  },
};
