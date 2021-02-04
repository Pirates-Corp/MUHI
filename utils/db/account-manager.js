import { getCollection } from '../db/helpers/db-util'
import { accountSchema } from './schema/account-schema'

const collectionName = process.env.userCollection

export const authenticate = () => {

}

export const login = () => {

}

export const logout = () => {

}

export const signup = async (details) => {
    const accountsCollection = await getCollection(collectionName, accountSchema)
    console.log(accountsCollection === undefined);
    accountsCollection.insertOne({ name: 'Test' }).then().catch(err => console.log(err + ""))
}

export const forgotPassword = () => {

}

export const validateResetToken = (token) => {

}

export const getUser = (id) => {

}

export const getAllusers = () => {

}

export const terminateUser = (id) => {

}

export const activateAccount = (id) => {

}

export const suspendAccount = (id) => {

}
