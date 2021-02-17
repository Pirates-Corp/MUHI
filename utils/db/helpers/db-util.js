import { MongoClient } from 'mongodb'

const uri = (process.env.dbConnectionString)
    .replace('<dbHost>', process.env.dbHost)
    .replace('<dbName>', process.env.dbName)
    .replace('<dbUser>', encodeURIComponent(process.env.dbUser))
    .replace('<dbPass>', encodeURIComponent(process.env.dbPass))

const updateOne = 'UPDATE_ONE',
    updateMany = 'UPDATE_MANY',
    deleteOne = 'DELETE_ONE',
    deleteMany = 'DELETE_MANY',
    createOne = 'CREATE_ONE',
    createMany = 'CREATE_MANY',
    readOne = 'READ_ONE',
    readMany = 'READ_MANY';

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null, user: null, collections: {} }
}

export const getDatabaseInstance = async () => {
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

export const getDocument = async (collectionName, schema, document) => {
    return await processQuery(readOne, collectionName, schema, document)
}

export const getDocuments = async (collectionName, schema, document) => {
    return await processQuery(readMany, collectionName, schema, document)
}

export const updateDocument = async (collectionName, schema, document, updateConition, queryOptions) => {
    return await processQuery(updateOne, collectionName, schema, document, updateConition, queryOptions)
}

export const updateDocuments = async (collectionName, schema, document, updateConition, queryOptions) => {
    return await processQuery(updateMany, collectionName, schema, document, updateConition, queryOptions)
}

export const deleteDocument = async (collectionName, schema, document) => {
    return await processQuery(deleteOne, collectionName, schema, document)
}

export const deleteDocuments = async (collectionName, schema, document) => {
    return await processQuery(deleteMany, collectionName, schema, document)
}

export const insertDocument = async (collectionName, schema, document) => {
    return await processQuery(createOne, collectionName, schema, document)
}

export const insertDocuments = async (collectionName, schema, document) => {
    return await processQuery(createMany, collectionName, schema, document)
}

export const processQuery = async (action, collectionName, schema, document, updateConition = undefined, queryOptions = undefined) => {
    try {
        const collection = await getCollection(collectionName, schema)
        switch (action) {
            case createOne:
                return [true, await collection.insertOne(document)]
            case createMany:
                return await collection.insertMany(document)
            case readOne:
                return await collection.findOne(document)
            case readMany:
                return await collection.findMany(document)
            case updateOne:
                return await collection.updateOne(document, updateConition, queryOptions);
            case updateMany:
                return await collection.updateMany(document, updateConition, queryOptions);
            case deleteOne:
                return await collection.deleteOne(document);
            case deleteMany:
                return await collection.deleteMany(document);
            default:
                return null
        }
    } catch (err) {
        return [false, err]
    }
}