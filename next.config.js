module.exports = {
  env: {
    nodeEnv : 'development',
    dbUser: 'muhi',
    dbPass: 'muhi.org',
    dbHost: 'quiz.manng.mongodb.net',
    dbName: 'Quiz',
    dbConnectionString: `mongodb+srv://<dbUser>:<dbPass>@<dbHost>/<dbName>?retryWrites=true&w=majority`,
    userCollection: 'accounts',
    quizCollection: 'quizzes',
    reportsCollection: 'reports',
    newsletterCollection: 'newsletters',
    hashSecret : '0254aed3ddfa2030ccb2c463fdb7ae0e99db6d9b181c004d7bd95ebb66ea4944',   // sha256 hash of 'muhiquiz'
    hashSaltRounds : 10,
    tokenExpiryTime : '7d',
    cookieExpiryTime : (60 * 60 * 8),  //in seconds
    cookieName : 'jwt'
  },
}