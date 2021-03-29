export const reportSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "rank", "avgScore", "reports"],
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: "string",
      },
      rank: {
        bsonType: "number",
      },
      avgScore: {
        bsonType: "number",
      },
      reports: {
        bsonType: "array",
        uniqueItems: true,
        additionalItems: false,
        items: {
          bsonType: "object",
          required: ["id", "rank", "status", "time", "score", "report"],
          additionalProperties: false,
          properties: {
            id: {
              bsonType: "string",
            },
            rank: {
              bsonType: "number",
            },
            status: {
              bsonType: "number",
              description: "1 - completed , 0 - ongoing",
            },
            questionsAttended: {
              bsonType: "array",
              uniqueItems: true,
              additionalItems: false,
              items: {
                bsonType: "number"
              },
            },
            time: {
              bsonType: "object",
              required: ["taken", "total"],
              additionalProperties: false,
              properties: {
                taken: {
                  bsonType: "number",
                },
                total: {
                  bsonType: "number",
                },
              },
            },
            score: {
              bsonType: "object",
              required: ["taken", "total"],
              additionalProperties: false,
              properties: {
                taken: {
                  bsonType: "number",
                },
                total: {
                  bsonType: "number",
                },
              },
            },
            report: {
              bsonType: "array",
              uniqueItems: true,
              additionalItems: false,
              items: {
                bsonType: "object",
                required: ["id", "chapter", "section","answer"],
                additionalProperties: false,
                properties: {
                  id: {
                    bsonType: "number",
                  },
                  chapter: {
                    bsonType: "string",
                  },
                  section: {
                    bsonType: "string",
                  },
                  result: {
                    bsonType: "number",
                  },
                  answer : {
                    bsonType: "string",
                  }
                },
              },
            },
          },
        },
      },
    },
  },
};
