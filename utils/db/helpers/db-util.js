import {MongoClient} from 'mongodb'

const uri = (process.env.dbConnectionString)
                .replace('<dbHost>',process.env.dbHost)
                .replace('<dbName>',process.env.dbName)
                .replace('<dbUser>',encodeURIComponent(process.env.dbUser))
                .replace('<dbPass>',encodeURIComponent(process.env.dbPass))

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

    cached.promise = MongoClient.connect(uri, opts).then((client) => {
        console.log('Mongo Client Initiated')
            return {
                client,
                db: client.db(process.env.dbName),
            }
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}