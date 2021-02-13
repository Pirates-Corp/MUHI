import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
    getCollection,
    getDatabaseInstance,
    getDocument,
    getDocuments,
    insertDocument,
    insertDocuments,
    deleteDocument,
    deleteDocuments,
    updateDocument,
    updateDocuments
} from '../db/helpers/db-util'
import { accountSchema } from './schema/account-schema'
import nodemailer from 'nodemailer'

const accountsCollection = process.env.userCollection

const saltRounds = process.env.hashSaltRounds

const hashSecret = process.env.hashSecret

const authTokenExpiryTime = process.env.authTokenExpiryTime

const resetTokenExpiryTime = process.env.resetTokenExpiryTime

const cookieExpiryTime = process.env.cookieExpiryTime

const cookieName = process.env.cookieName

const passwordResetPath = process.env.passwordResetPath

const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const isProductionEnv = process.env.nodeEnv === 'production'

const mailSubject = 'Password reset notification'

const mailMessage = 'Password reset request is submitted for you account./nPlease follow this <link> to reset the password./nIf its not you, please ignore this mail.'

let cached = global.mongo

export const authenticate = async (httpReq, httpRes) => {
    let resCode = 400
    let resText = ""
    try {
        const token = getTokenFromCookie(httpReq)
        if (token) {
            const decoded = decodePayload(token)
            const user = await getCurrentUser()
            if (user && decoded && user._id === decoded.email && user.password === decoded.password) {
                resCode = 200
                resText = "Valid User : " + user._id
                console.log(resText)
            } else {
                resCode = 401
                resText = "Invalid User : " + user._id
                console.log(resText)
                httpRes.redirect([301], "\login")
            }
        } else {
            resCode = 401
            resText = "No users logged in"
            console.log(resText)
        }
    } catch (err) {
        resCode = 400
        resText = 'Error in authentication. Error => ' + err
        console.log(resText)
    }
    httpRes.statusCode = resCode
    httpRes.send(resText)
}

export const login = async (httpReq, httpRes) => {
    let resCode = 400
    let resText = ""
    try {
        if (httpReq.method !== "POST") {
            resCode = 401;
            resText = ""
        } else if (getCurrentUser()) {
            resCode = 400;
            resText = "Already Logged In"
        } else {
            let userDetails = httpReq.body
            if (userDetails.email && userDetails.password) {
                if (!emailRegex.test(new String(userDetails.email).trim())) {
                    resText = "Incorrect email";
                    console.log(resText)
                }
                const user = await getUser(userDetails.email)
                if (user) {
                    console.log('User found in DB => ' + user._id)
                    const isPasswordCorrect = bcrypt.compareSync(userDetails.password, user.password)
                    if (isPasswordCorrect) {
                        resText = 'Login Successfull for user => ' + userDetails.email
                        httpRes = saveTokenInCookie(httpRes, user._id, user.password)
                        resCode = 200
                        updateCurrentUserInGlobalScope(user)
                        console.log(resText);
                    } else {
                        resText = 'Login Failed due to incorrect password for the user => ' + userDetails.email
                        resCode = 401
                        console.log(resText);
                    }
                } else {
                    resText = 'User Not found =>' + userDetails.email
                    console.log(resCode);
                }
            } else {
                resText = "Required fields missing";
            }
        }
    } catch (err) {
        resCode = 400
        resText = 'Error while logging in. Error => ' + err
        console.log(resText)
    }
    httpRes.statusCode = resCode
    httpRes.send(resText)
}

export const logout = async (httpReq, httpRes) => {
    let resCode = 400
    let resText = ""
    if (httpReq.method !== "POST") {
        resCode = 401;
        resText = ""
    } else {
        if (getCurrentUser()) {
            resCode = 200
            resText = 'Logout successfull'
            removeCurrentUserFromGlobalScope();
            deleteTokenFromCookie(httpRes);
        } else {
            resCode = 400;
            resText = "Login first !"
        }
    }
    httpRes.statusCode = resCode
    httpRes.send(resText)
}

export const signup = async (httpReq, httpRes) => {
    let resCode = 400
    let resText = ""
    try {
        if (httpReq.method !== "PUT") {
            resCode = 401;
            resText = ""
        } else if (getCurrentUser()) {
            resCode = 400;
            resText = "Already Logged In"
        } else {
            let userDetails = httpReq.body
            if (userDetails.name && userDetails.email && userDetails.password && userDetails.mobileNo && userDetails.accountType) {
                if (new String(userDetails.role).trim() !== "admin" && !emailRegex.test(new String(userDetails.email).trim())) {
                    resText = "Incorrect email";
                    console.log(resText)
                }
                userDetails.accountState = userDetails.accountState ? userDetails.accountState : "active"
                userDetails.role = userDetails.role ? userDetails.role : "user"
                userDetails._id = userDetails.email
                userDetails.password = bcrypt.hashSync(userDetails.password, saltRounds)
                await createUser(userDetails).then(result => {
                    resText = "Account created for the user : " + JSON.stringify(userDetails) + ";"
                    httpRes = saveTokenInCookie(httpRes, userDetails._id, userDetails.password)
                    resCode = 201
                    updateCurrentUserInGlobalScope(userDetails)
                    console.log(resText);
                }).catch(err => {
                    if (err.code == 11000) {
                        resCode = 409
                        resText = 'account already exists : ' + err
                        console.log('Account already exists : ' + err);
                    } else {
                        resText = "Account creation failed for the user : " + JSON.stringify(userDetails) + ";  Error : " + JSON.stringify(err)
                    }
                })
            } else {
                resText = "Required fields missing";
            }
        }
    } catch (err) {
        resCode = 400
        resText = 'Error while signing up. Error => ' + err
        console.log(resText)
    }
    httpRes.statusCode = resCode
    httpRes.send(resText)
}

export const forgotPassword = async (httpReq, httpRes) => {
    let resCode = 400
    let resText = ""
    try {
        const email = httpReq.body?.email
        if (email) {
            const encodedToken = encodePayload({ email }, resetTokenExpiryTime)
            const document = { _id: email };
            const updateConition = {
                $set: {
                    resetToken: encodedToken,
                },
            };
            const queryOptions = { upsert: false }
            await updateUserDetails(document, updateConition, queryOptions)
            const passwordResetLink = getPasswordResetLink(httpReq, encodedToken)
            sendResetTokenToMail(email, passwordResetLink)
            resCode = 200
            resText = 'Reset token sent to mail'
            console.log(resText)
        }
    } catch (err) {
        resCode = 400
        resText = 'Error in authentication. Error => ' + err
        console.log(resText)
    }
    httpRes.statusCode = resCode
    httpRes.send(resText)
}

export const validateResetToken = async (httpReq, httpRes) => {
    let resCode = 400
    let resText = ""
    try {
        const token = httpReq.body?.token
        if (token) {
            const decoded = decodePayload(token)
            if (decoded.id && decoded.password) {
                const user = await getUser(decoded.id)
                if (user) {
                    console.log('User found in DB => ' + user._id)
                    resText = 'Reset token validated succesfully'
                    resCode = 200
                } else {
                    resText = 'Invalid reset token'
                    resCode = 400
                    console.log(resCode);
                }
            }
        } else {
            resText = "Token is empty"
        }
    } catch (err) {
        resCode = 400
        resText = 'Error in authentication. Error => ' + err
        console.log(resText)
    }
    httpRes.statusCode = resCode
    httpRes.send(resText)
}

export const createUser = async (userDetails) => {
    return await insertDocument(accountsCollection, accountSchema, userDetails)
}

export const getUser = async (id) => {
    try {
        return getDocument(accountsCollection, accountSchema, { _id: id })
    } catch (err) {
        console.log('Error getting user from DB => ' + err)
    }
    return null
}

export const getUserDetails = async (httpReq, httpRes) => {
    const user = await getUser('id')
    delete user.password
}

export const updateUserDetails = async (document, updateConition, queryOptions) => {
    try {
        return updateDocument(accountsCollection, accountSchema, document, updateConition, queryOptions)
    } catch (err) {
        console.log('Error getting user from DB => ' + err)
    }
    return null
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


export const saveTokenInCookie = (httpRes, email, password) => {
    const jwtToken = encodePayload({ email, password }, authTokenExpiryTime)
    const cookie = `${cookieName}=${jwtToken}; Max-Age=${cookieExpiryTime}; HttpOnly=true; Secure=${isProductionEnv}; SameSite=Lax`
    httpRes.setHeader('Set-cookie', cookie)
    return httpRes
}

export const deleteTokenFromCookie = (httpRes) => {
    let cookie = `${cookieName}='';Expires=${new Date(Date.now() - cookieExpiryTime)}`
    httpRes.setHeader('Set-cookie', cookie)
    return httpRes
}

export const encodePayload = (payload, expiryTime) => {
    try {
        return jwt.sign(
            payload,
            hashSecret,
            { expiresIn: expiryTime },
            { algorithm: 'RS256' }
        );
    } catch (err) {
        console.log('Error while encoding JWT => ' + err)
    }
    return null
}

export const decodePayload = (token) => {
    try {
        var decoded = jwt.verify(token, hashSecret)
        return decoded
    } catch (err) {
        console.log('Error while decodind JWT => ' + err)
    }
    return null
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

export const sendResetTokenToMail = async (toAddress, resetLink) => {
    const transporter = nodemailer.createTransport({
        service: process.env.mailService,
        auth: {
            user: process.env.mailUser,
            pass: process.env.mailPassword
        }
    });


    const mailOption = {
        from: process.env.mailUser,
        to: toAddress,
        subject: mailSubject,
        text: resetLink
    };

    await transporter.sendMail(mailOption).then(res => {
        console.log("Mail successfully sent => " + JSON.stringify(res));
    }).catch(err => {
        console.log("Error while sending mail => " + err);
    });
}

export const getPasswordResetLink = (httpReq, token) => {
    const host = httpReq.headers.host
    return `http://${host}${passwordResetPath}${encodeURI(token)}`
}