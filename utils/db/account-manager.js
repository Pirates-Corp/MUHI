import bcrypt from 'bcrypt'
import jwt, { decode } from 'jsonwebtoken'
import { getCollection } from '../db/helpers/db-util'
import { accountSchema } from './schema/account-schema'

const collectionName = process.env.userCollection

const saltRounds = process.env.hashSaltRounds

const hashSecret = process.env.hashSecret

const authTokenExpiryTime = process.env.tokenExpiryTime

const cookieExpiryTime = process.env.cookieExpiryTime

const cookieName = process.env.cookieName

const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const isProductionEnv = process.env.nodeEnv === 'production'

let cached = global.mongo

export const authenticate = async (httpReq, httpRes) => {
    let resCode = 400
    let resText = ""
    const token = getTokenFromCookie(httpReq)
    if (token) {
        const decoded = decodePayload(token)
        const user = await getCurrentUser()
        if (user && user._id === decoded.id && user.password === decoded.password) {
            resCode = 200
            resText = "Valid User : " + user._id
            console.log("Valid User : " + user._id)
        } else {
            resCode = 401
            console.log("Invalid User")
        }
    }
    httpRes.statusCode = resCode
    httpRes.send(resText)
}

export const login = async (httpReq, httpRes) => {
    let resCode = 400
    let restext = ""
    if (httpReq.method !== "POST") {
        resCode = 401;
        restext = ""
    } else {
        let userDetails = httpReq.body
        if (userDetails.email && userDetails.password) {
            if (new String(userDetails.role).trim() !== "admin" && !emailRegex.test(new String(userDetails.userId).trim())) {
                restext = "Incorrect email";
                console.log(restext)
            }
            const accountsCollection = await getCollection(collectionName, accountSchema)
            const user = await accountsCollection.findOne({ _id: userDetails.email })
            console.log('User found in DB => ' + user._id)
            const isPasswordCorrect = bcrypt.compareSync(userDetails.password, user.password)
            if (isPasswordCorrect) {
                restext = 'Login Successfull for user => ' + userDetails.email
                httpRes = saveTokenInCookie(httpRes, user._id, user.password)
                resCode = 201
                updateCurrentUserInGlobalScope(user)
                console.log(restext);
            }
        } else {
            restext = "Required fields missing";
        }
    }
    httpRes.statusCode = resCode
    httpRes.send(restext)
}

export const logout = async (httpReq, httpRes) => {
    let resCode = 400
    let restext = ""
    if (httpReq.method !== "POST") {
        resCode = 401;
        restext = ""
    } else {
        resCode = 200
        restext = 'Logout successfull'
        removeCurrentUserFromGlobalScope();
        deleteTokenFromCookie(httpRes);
    }
    httpRes.statusCode = resCode
    httpRes.send(restext)
}

export const signup = async (httpReq, httpRes) => {
    let resCode = 400
    let restext = ""
    if (httpReq.method !== "POST") {
        resCode = 401;
        restext = ""
    } else {
        let userDetails = httpReq.body
        if (userDetails.name && userDetails.email && userDetails.password && userDetails.mobileNo && userDetails.accountState && userDetails.role && userDetails.accountType) {
            if (new String(userDetails.role).trim() !== "admin" && !emailRegex.test(new String(userDetails.userId).trim())) {
                restext = "Incorrect email";
                console.log(restext)
            }
            userDetails._id = userDetails.email
            userDetails.password = bcrypt.hashSync(userDetails.password, saltRounds)
            const accountsCollection = await getCollection(collectionName, accountSchema)
            await accountsCollection.insertOne(userDetails).then(() => {
                restext = "Account created for the user : " + JSON.stringify(userDetails) + ";"
                httpRes = saveTokenInCookie(httpRes, userDetails._id, userDetails.password)
                resCode = 201
                updateCurrentUserInGlobalScope(userDetails)
                console.log(restext);
            }).catch((err) => {
                if (err.code == 11000) {
                    resCode = 409
                    restext = 'account already exists : ' + err
                    console.log('Account already exists : ' + err);
                } else {
                    restext = "Account creation failed for the user : " + JSON.stringify(userDetails) + ";  Error : " + JSON.stringify(err)
                }
            })
        } else {
            restext = "Required fields missing";
        }
    }
    httpRes.statusCode = resCode
    httpRes.send(restext)
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


/**
 *  Helper functions
 */

export const getTokenFromCookie = (httpReq) => {
    if (httpReq.cookies) {
        return httpReq.cookies[cookieName]
    }
    let rawCookie = httpReq.headers?.cookie
    return rawCookie[cookieName]
}


export const saveTokenInCookie = (httpRes, id, password) => {
    const jwtToken = encodePayload(id, password)
    const cookie = `${cookieName}=${jwtToken}; Max-Age=${cookieExpiryTime}; HttpOnly=true; Secure=${isProductionEnv}; SameSite=Lax`
    httpRes.setHeader('Set-cookie', cookie)
    return httpRes
}

export const deleteTokenFromCookie = (httpRes) => {
    let cookie = `${cookieName}='';Expires=${new Date(Date.now() - cookieExpiryTime)}`
    httpRes.setHeader('Set-cookie', cookie)
    return httpRes
}

export const encodePayload = (id, password) => {
    return jwt.sign(
        { id, password },
        hashSecret,
        { expiresIn: authTokenExpiryTime },
        { algorithm: 'RS256' }
    );
}

export const decodePayload = (token) => {
    var decoded = jwt.verify(token, hashSecret)
    return decoded
}

export const getCurrentUser = () => {
    if (cached.user) {
        console.log('Current User exists in the global scope. User : ' + cached.user);
        return cached.user
    }

    console.log('Current User doesn\'t exists in the global scope. Returning null');

    return undefined
}

export const updateCurrentUserInGlobalScope = (userDetails) => {
    cached.user = userDetails
    console.log('Updated Current User in Global Scope.  User : ' + userDetails);
}

export const removeCurrentUserFromGlobalScope = () => {
    console.log('Removing Current User form Global Scope.User : ' + getCurrentUser());
    updateCurrentUserInGlobalScope(null)
}