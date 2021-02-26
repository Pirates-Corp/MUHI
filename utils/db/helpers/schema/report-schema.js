export const reportSchema = {
  $jsonSchema: {
    required: ["_id", "rank", "avgScore", "report"],
    properties: {
      _id: {
        bsonType: "string",
        description: "Name field is required",
      },
      rank: {
        bsonType: "string",
        description: "Content field is required",
      },
      avgScore: {
        minLength: 6,
        maxLength: 9,
        bsonType: "double",
        description: "Account state is optional. 1.Active 2.Inactive",
      },
      reports: {
        bsonType: "array",
        uniqueItems: true,
        items: {
          bsonType: "object",
          required: [
            "quizId",
            "rank",
            "status",
            "questionsLeft",
            "time",
            "score",
            "marks",
          ],
          properties: {
            quizId: {
              bsonType: "string",
              description: "quizId is required",
            },
            rank: {
              bsonType: "string",
              description: "quizRank is a required ",
            },
            status: {
              bsonType: "string",
              description: "status is required - completed or ongoing",
            },
            questionsLeft: {
              bsonType: "array",
              uniqueItems: true,
              items: {
                bsonType: "object",
                required: ["qNo"],
                properties: {
                  qNo: {
                    bsonType: "int",
                    description: "question number is required",
                  },
                },
              },
            },
            time: {
              bsonType: "object",
              required: ["taken", "total"],
              description: "time field is required",
              properties: {
                taken: {
                  bsonType: "string",
                  description: "time taken field is required",
                },
                total: {
                  bsonType: "string",
                  description: "total time field is required",
                },
              },
            },
            score: {
              bsonType: "object",
              required: ["taken", "total"],
              description: "score field is required",
              properties: {
                taken: {
                  bsonType: "string",
                  description: "score taken field is required",
                },
                total: {
                  bsonType: "string",
                  description: "total score field is required",
                },
              },
            },
            marks: {
              bsonType: "array",
              uniqueItems: true,
              items: {
                bsonType: "object",
                required: ["qNo", "chapter", "section"],
                properties: {
                  qNo: {
                    bsonType: "int",
                    description: "question number is required",
                  },
                  chapter: {
                    bsonType: "string",
                    description: "chapter is required",
                  },
                  section: {
                    bsonType: "string",
                    description: "section is required",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
