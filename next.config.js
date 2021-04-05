module.exports = {
  env: {
    nodeEnv: "development",
    domainUrl : "https://localhost:3000",
    dbUser: "muhi",
    dbPass: "muhi.org",
    dbHost: "quiz.manng.mongodb.net",
    dbName: "Quiz",
    dbConnectionString: `mongodb+srv://<dbUser>:<dbPass>@<dbHost>/<dbName>?retryWrites=true&w=majority`,
    userCollection: "accounts",
    quizCollection: "quizzes",
    reportsCollection: "reports",
    newsletterCollection: "newsletters",
    hashSecret:
      "0254aed3ddfa2030ccb2c463fdb7ae0e99db6d9b181c004d7bd95ebb66ea4944", // sha256 hash of 'muhiquiz'
    hashSaltRounds: 10,
    authTokenExpiryTime: "7d",
    resetTokenExpiryTime: "15m",
    cookieExpiryTime: 60 * 60 * 24 * 7, //7 days in seconds
    cookieName: "jwt",
    mailService: "gmail",
    mailUser: "muhiquiz@gmail.com",
    mailPassword: "aeqqlwyuysqqniff",
    mailSubject_passwordResetRequest: "Password reset link",
    mailSubject_passwordResetNotification: "Password reset notificationn",
    mailSubject_accountCreationNotification: "Account creation notification",
    passwordResetRequest:
      "Password reset request is submitted for your account. Please use the following link <link> to reset the password. If its not you, please ignore this mail.",
    passwordResetNotification:
      "Your Muhi Account's password was changed successfully. Please use the following link <link> to log into your account.",
    accountCreationNotification:
      "You have created an account in Muhi Quiz. Please use the following link <link> to take quizzes.",
    routes: {
      loginRedirectAdmin: "/admin/dashboard",
      loginRedirectUser: "/dashboard",
      invalidPassword: "?incorrect",
      invalidUser: "?incorrect",
      passwordResetPath: "/admin/reset_password/",
    },
  },
};
