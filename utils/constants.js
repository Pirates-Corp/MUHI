import { accountSchema } from "./db/helpers/schema/account-schema";
import { quizSchema } from "./db/helpers/schema/quiz-schema";
import { reportSchema } from "./db/helpers/schema/report-schema";
import { newsLetterSchema } from "./db/helpers/schema/newsletter-schema";

export const constants = {
  saltRounds: process.env.hashSaltRounds,
  hashSecret: process.env.hashSecret,
  authTokenExpiryTime: process.env.authTokenExpiryTime,
  resetTokenExpiryTime: process.env.resetTokenExpiryTime,
  cookieExpiryTime: process.env.cookieExpiryTime,
  cookieName: process.env.cookieName,
  mailSubject_passwordResetRequest: "Password reset link",
  mailSubject_passwordResetNotification: "Password reset notificationn",
  mailSubject_accountCreationNotification: "Account creation notification",
  passwordResetRequest:
    "Password reset request is submitted for your account. Please use the following link <link> to reset the password. If its not you, please ignore this mail.",
  passwordResetNotification:
    "Your Muhi Account's password was changed successfully. Please use the following link <link> to log into your account.",
  accountCreationNotification:
    "You have created an account in Muhi Quiz. Please use the following link <link> to take quizzes.",
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
  routes: {
    loginRedirectAdmin: "/admin/dashboard",
    loginRedirectUser: "/admin/dashboard",
    invalidPassword: "?password:invalid",
    invalidUser: "?user:invalid",
    passwordResetPath: "/admin/reset_password/",
  },
};
