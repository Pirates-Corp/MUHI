module.exports = {
  env: {
    dbUser: 'muhi',
    dbPass: 'muhi.org',
    dbHost: 'quiz.manng.mongodb.net',
    dbName: 'Quiz',
    dbConnectionString: `mongodb+srv://<dbUser>:<dbPass>@<dbHost>/<dbName>?retryWrites=true&w=majority`,
    userCollection: 'accounts',
    quizCollection: 'quizzes',
    reportsCollection: 'reports',
    newsletterCollection: 'newsletters'
  },
}