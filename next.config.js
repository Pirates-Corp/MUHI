module.exports = {
  env: {
    nodeEnv: 'development',
    dbUser: 'muhi',
    dbPass: 'muhi.org',
    dbHost: 'quiz.manng.mongodb.net',
    dbName: 'Quiz',
    dbConnectionString: `mongodb+srv://<dbUser>:<dbPass>@<dbHost>/<dbName>?retryWrites=true&w=majority`,
    userCollection: 'accounts',
    quizCollection: 'quizzes',
    reportsCollection: 'reports',
    newsletterCollection: 'newsletters',
    hashSecret: '0254aed3ddfa2030ccb2c463fdb7ae0e99db6d9b181c004d7bd95ebb66ea4944',   // sha256 hash of 'muhiquiz'
    hashSaltRounds: 10,
    authTokenExpiryTime: '7d',
    resetTokenExpiryTime: '15m',
    cookieExpiryTime: (60 * 60 * 24 * 7),  //7 days in seconds
    cookieName: 'jwt',
    mailService: 'gmail',
    mailUser: 'muhiquiz@gmail.com',
    mailPassword: 'aeqqlwyuysqqniff',
    passwordResetPath: '/reset_password/'
  }
}