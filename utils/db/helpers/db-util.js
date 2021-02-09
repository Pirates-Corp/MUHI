import { MongoClient } from 'mongodb'

const uri = (process.env.dbConnectionString)
    .replace('<dbHost>', process.env.dbHost)
    .replace('<dbName>', process.env.dbName)
    .replace('<dbUser>', encodeURIComponent(process.env.dbUser))
    .replace('<dbPass>', encodeURIComponent(process.env.dbPass))

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null, user: null, collections: {} }
}

export async function getDatabaseInstance() {
    if (cached.conn) {
        console.log('Mongo Client is already exists in the global scope.');
        return cached.conn
    }

    console.log('Mongo Client doesn\'t exists in the global scope. Making Database Connection...');

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

export const getCollection = async (collectionName, schema) => {
    if (cached.collections[collectionName]) {
        console.log(collectionName + '- Collection is already exists in the global scope. Returning the collection');
        return cached.collections[collectionName]
    }

    console.log(collectionName + '- Collection doesn\'t exists in the global scope. Making database call...');

    const { db } = cached.conn ? cached.conn : await getDatabaseInstance()

    const collections = await db.listCollections({ name: collectionName }).toArray();

    const collectionNames = collections.filter(c => c.name === collectionName);

    if (collectionNames.length > 0) {
        console.log(collectionName + '- Collection already exists in the Database. Returning the collection');
        cached.collections[collectionName] = db.collection(collectionName)
    } else {
        console.log(collectionName + '- Collection doesn\'t exists in the Database. Creating and returning the collection');
        db.createCollection(collectionName, { validator: schema })
        const colection = db.collection(collectionName)
        cached.collections[collectionName] = colection
    }

    return cached.collections[collectionName];
}

