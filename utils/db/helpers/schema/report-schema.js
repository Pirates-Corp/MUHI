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
        bsonType: "string",
      },
      avgScore: {
        bsonType: "double",
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
              bsonType: "string",
            },
            status: {
              bsonType: "string",
              description: " completed or ongoing",
            },
            questionsLeft: {
              bsonType: "array",
              uniqueItems: true,
              additionalItems: false,
              items: {
                bsonType: "object",
                required: ["qNo"],
                additionalProperties: false,
                properties: {
                  qNo: {
                    bsonType: "number",
                  },
                },
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
                required: ["id", "chapter", "section", "result"],
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
                    bsonType: "string",
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
