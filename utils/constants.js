import { accountSchema } from "./db/helpers/schema/account-schema";
import { quizSchema } from "./db/helpers/schema/quiz-schema";
import { reportSchema } from "./db/helpers/schema/report-schema";
import { newsLetterSchema } from "./db/helpers/schema/newsletter-schema";

export const constants = {
  roles: {
    admin: "admin",
    moderator: "moderator",
    user: "user",
  },
  collectionMap: {
    user: {
      collectionName: process.env.userCollection,
      schema: accountSchema,
    },
    quiz: {
      collectionName: process.env.quizCollection,
      schema: quizSchema,
    },
    newsletter: {
      collectionName: process.env.newsletterCollection,
      schema: newsLetterSchema,
    },
    report: {
      collectionName: process.env.reportsCollection,
      schema: reportSchema,
    },
  },
};
