import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
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
  updateDocuments,
} from "./db/helpers/db-util";
import nodemailer from "nodemailer";
import { constants } from "./constants";
import { addUserReport } from "./db/db-handler";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const isProductionEnv = process.env.nodeEnv || "production";

let cached = global.mongo;

export const authenticate = async (httpReq) => {
  let resCode = 400;
  let resBody = null;
  try {
    const token = getTokenFromCookie(httpReq);
    if (token) {
      const decoded = decodePayload(token);
      if (decoded) {
        const user = await getUser(decoded.id);
        if (user && decoded && user._id === decoded.id) {
          const isPasswordCorrect = bcrypt.compareSync(
            decoded.password,
            user.password
          );
          if (isPasswordCorrect) {
            console.log("Valid User => " + user._id);
            let currentUser = { ...user };
            delete currentUser.password;
            delete currentUser.resetToken;
            resCode = 200;
            resBody = currentUser;
          } else {
            console.log("Invalid Password => " + user._id);
          }
        } else {
          console.log("Invalid User => " + user._id);
        }
      } else {
        console.log("JWT expired.");
        removeCurrentUserFromGlobalScope();
      }
    } else {
      resCode = 401;
      resBody = "No users logged in";
      console.log(resBody);
    }
  } catch (err) {
    resCode = 400;
    resBody = "Error in authentication => " + err;
    console.log(resBody);
  }
  return [resCode, resBody];
};

export const login = async (httpReq, httpRes) => {
  let resCode = 400;
  let resText = "";
  try {
    const authResult = await authenticate(httpReq);
    if (httpReq.method !== "POST") {
      resCode = 401;
      resText = "";
    } else if (authResult[0] === 200) {
      if (authResult[1].role === constants.roles.user) {
        httpRes.redirect(process.env.routes.loginRedirectUser);
      } else {
        httpRes.redirect(process.env.routes.loginRedirectAdmin);
      }
      return;
    } else {
      let userDetails = httpReq.body;
      if (userDetails.id && userDetails.password) {
        const user = await getUser(userDetails.id);
        if (user) {
          console.log("User found in DB => " + user._id);
          const isPasswordCorrect = bcrypt.compareSync(
            userDetails.password,
            user.password
          );
          if (isPasswordCorrect) {
            resText = "Login Successfull for user => " + userDetails.id;
            const jwtToken = encodePayload(
              { id: user._id, password: userDetails.password },
              process.env.authTokenExpiryTime
            );
            saveTokenInCookie(httpRes, jwtToken);
            resCode = 200;
            await updateLastAciveTimeForTheUser(user._id);
            updateCurrentUserInGlobalScope(user);
            console.log(resText);
            if (user.role === constants.roles.admin) {
              httpRes.redirect(307, process.env.routes.loginRedirectAdmin);
            } else if (user.role === constants.roles.moderator) {
              httpRes.redirect(process.env.routes.loginRedirectAdmin);
            } else {
              httpRes.redirect(process.env.routes.loginRedirectUser);
            }
            return;
          } else {
            console.log("Invalid password for the user => " + userDetails.id);
            httpRes.redirect(
              httpReq.headers.referer.split("?")[0] +
                process.env.routes.invalidPassword
            );
            return;
          }
        } else {
          resText = "User Not found => " + userDetails.id;
          resCode = 400;
          console.log(resText);
          if (httpReq.headers.referer) {
            httpRes.redirect(
              httpReq.headers.referer.split("?")[0] +
                process.env.routes.invalidUser
            );
            return;
          }
        }
      } else {
        resText = "Required fields missing";
      }
    }
  } catch (err) {
    resCode = 400;
    resText = "Error while logging in. Error => " + err;
    console.log(resText);
  }
  httpRes.statusCode = resCode;
  httpRes.send(resText);
};

export const logout = async (httpReq, httpRes) => {
  let resCode = 400;
  let resText = "";
  if (httpReq.method !== "PUT") {
    resCode = 401;
    resText = "";
  } else {
    if ((await authenticate(httpReq))[0] === 200) {
      resCode = 200;
      resText = "Logout successfull";
      removeCurrentUserFromGlobalScope();
      deleteTokenFromCookie(httpRes);
    } else {
      resCode = 400;
      resText = "Login first !";
    }
  }
  httpRes.statusCode = resCode;
  httpRes.send(resText);
};

export const signup = async (httpReq, httpRes) => {
  let resCode = 400;
  let resText = "";
  try {
    const authResult = await authenticate(httpReq);
    if (httpReq.method !== "PUT") {
      resCode = 401;
      resText = "";
    } else if (authResult[0] === 200) {
      if (authResult[1].role === constants.roles.user) {
        httpRes.redirect(process.env.routes.loginRedirectUser);
      } else {
        httpRes.redirect(process.env.routes.loginRedirectAdmin);
      }
      return;
    } else {
      let userDetails = httpReq.body;
      if (userDetails.name && userDetails.email && userDetails.role) {
        userDetails._id = new String(
          userDetails.role === constants.roles.admin
            ? userDetails.name
            : userDetails.email
        ).toLowerCase();
        userDetails.mobileNo = userDetails.mobileNo;
        userDetails.role = new String(userDetails.role).toLowerCase();
        userDetails.state = new String(
          userDetails.state ? userDetails.state : "active"
        ).toLowerCase();
        userDetails.accountType = new String(
          userDetails.accountType ? userDetails.accountType : "muhi"
        ).toLowerCase();
        if (userDetails.accountType !== "google" && !userDetails.password) {
          resText = "Please provide the password";
          console.log(resText);
        } else if (!emailRegex.test(new String(userDetails.email).trim())) {
          resText = "Unusual email pattern. Signup request rejected";
          console.log(resText);
        } else {
          const plainPassword = userDetails.password;
          userDetails.password = bcrypt.hashSync(
            userDetails.password,
            process.env.hashSaltRounds
          );
          userDetails.lastLogin = Date.now();
          userDetails.email = userDetails.email.trim().toLowerCase()
          const result = await createUser(userDetails);
          if (result.length >= 1 && result[0] === true) {
            resText =
              "Account created for the user : " +
              JSON.stringify(userDetails) +
              ";";
            const jwtToken = encodePayload(
              { id: userDetails._id, password: plainPassword },
              process.env.authTokenExpiryTime
            );
            saveTokenInCookie(httpRes, jwtToken);
            resCode = 201;
            updateCurrentUserInGlobalScope(userDetails);
            await sendMail(
              userDetails.email,
              process.env.mailSubject_accountCreationNotification,
              getMailBody(httpReq, process.env.accountCreationNotification)
            );
            if (userDetails.role === constants.roles.admin) {
              httpRes.redirect(process.env.routes.loginRedirectAdmin);
            } else if (userDetails.role === constants.roles.moderator) {
              httpRes.redirect(process.env.routes.loginRedirectAdmin);
            } else {
              httpRes.redirect(307,process.env.routes.loginRedirectUser);
            }
            const reportCreationResult = await addUserReport(userDetails._id);
            if (reportCreationResult && reportCreationResult[0] === 201) {
              resText = resText + "and Report is created for user";
            } else {
              resText =
                resText +
                "and Report creation is failed for user =>" +
                reportCreationResult[1];
            }
            console.log("Singup result => " + resText);
            return;
          } else if (result.length >= 1 && result[0] === false) {
            if (result[1].code == 11000) {
              resCode = 409;
              resText = "account already exists : " + result[1];
              console.log(resText);
            } else {
              resText =
                "Account creation failed for the user : " +
                JSON.stringify(userDetails) +
                ";  Error : " +
                JSON.stringify(result[1]);
              console.log(resText);
            }
          } else {
            console.log("Unknown error ocured while signing up => " + result);
          }
        }
      } else {
        resText = "Required fields missing";
      }
    }
  } catch (err) {
    resCode = 400;
    resText = "Error while signing up. Error => " + err;
    console.log(resText);
  }
  httpRes.statusCode = resCode;
  httpRes.send(resText);
};

export const forgotPassword = async (httpReq, httpRes) => {
  let resCode = 400;
  let resText = "";
  try {
    if (httpReq.method !== "PUT") {
      resCode = 401;
      resText = "";
    } else {
      const id = httpReq.body?.id;
      if (id) {
        const user = await getUser(id);
        if (user) {
          let email;
          if (
            !emailRegex.test(new String(id).trim()) &&
            user.role === "admin"
          ) {
            email = user.email;
          } else {
            email = id;
          }
          const encodedToken = encodePayload(
            { id },
            process.env.resetTokenExpiryTime
          );
          const result = await updatePasswordResetTokenForTheUser(
            id,
            encodedToken
          );
          if (result && result[0] === true) {
            const mailBody = getMailBody(
              httpReq,
              process.env.passwordResetRequest,
              process.env.routes.passwordResetPath,
              encodedToken
            );
            await sendMail(
              email,
              process.env.mailSubject_passwordResetRequest,
              mailBody
            );
            resCode = 200;
            resText = "Reset token sent to mail";
            console.log(resText);
          } else {
            resText = result[1];
            console.log(result);
          }
        } else {
          resCode = 404;
          resText = "User Not Found => " + id;
          console.log(resText);
        }
      } else {
        resText = "Required fields missing";
      }
    }
  } catch (err) {
    resCode = 400;
    resText = "Error in authentication. Error => " + err;
    console.log(resText);
  }
  httpRes.statusCode = resCode;
  httpRes.send(resText);
};

export const updatePassword = async (httpReq, httpRes) => {
  let resCode = 400;
  let resText = "";
  try {
    if (httpReq.method !== "PUT") {
      resCode = 401;
      resText = "";
    } else {
      let id;
      const authResult = await authenticate(httpReq);
      if (authResult[0] === 200) {
        id = authResult[1]._id;
      } else {
        const token = httpReq.body?.token;
        if (token) {
          const decoded = decodePayload(token);
          id = decoded.id;
        }
      }
      let newPassword = httpReq.body?.password;
      if (id && newPassword) {
        const user = await getUser(id);
        if (user) {
          let passwordHash = bcrypt.hashSync(
            newPassword,
            process.env.hashSaltRounds
          );
          await updateUserPassword(id, passwordHash);
          const mailBody = getMailBody(
            httpReq,
            process.env.passwordResetNotification
          );
          await sendMail(
            id,
            process.env.mailSubject_passwordResetNotification,
            mailBody
          );
          const jwtToken = encodePayload(
            { id, password: newPassword },
            process.env.authTokenExpiryTime
          );
          updateTokenInCookie(httpRes, jwtToken);
          updateCurrentUserInGlobalScope(user);
          resCode = 200;
          resText = "Password successfully updated !";
          console.log(resText);
        } else {
          resCode = 400;
          resText = "Error while updating password ! Please try again";
          console.log(resText);
        }
      } else {
        resCode = 400;
        resText = "Error while updating password ! Invalid user => " + id;
        console.log(resText);
      }
    }
  } catch (err) {
    resCode = 400;
    resText = "Error while updating password. Error => " + err;
    console.log(resText);
  }
  httpRes.statusCode = resCode;
  httpRes.send(resText);
};

export const validateResetToken = async (httpReq, httpRes) => {
  let resCode = 400;
  let resText = "";
  try {
    if (httpReq.method !== "POST") {
      resCode = 401;
      resText = "";
    } else {
      const token = httpReq.body?.token;
      if (token) {
        const decoded = decodePayload(token);
        if (decoded) {
          const user = await getUser(decoded.id, true);
          console.log(user);
          if (user && token === user.resetToken) {
            console.log("User found in DB => " + user._id);
            console.log(
              "reset token validated successfully for user => " + decoded.id
            );
            const currentUser = { ...user };
            delete currentUser.resetToken;
            delete currentUser.password;
            resCode = 200;
            httpRes.json(currentUser);
            return;
          } else {
            resText = "Invalid reset token";
            resCode = 400;
            console.log(resText);
          }
        }
      } else {
        resText = "Token is empty";
        console.log(resText);
      }
    }
  } catch (err) {
    resCode = 400;
    resText = "Error in authentication. Error => " + err;
    console.log(resText);
  }
  httpRes.statusCode = resCode;
  httpRes.send(resText);
};

/**
 *  Helper functions
 */

export const createUser = async (userDetails) => {
  return await insertDocument(
    constants.collectionMap.user.collectionName,
    constants.collectionMap.user.schema,
    userDetails
  );
};

export const updatePasswordResetTokenForTheUser = async (id, encodedToken) => {
  const updateCondition = {
    $set: {
      resetToken: encodedToken,
    },
  };
  const queryOptions = { upsert: false };
  return await updateUserDetails(id, updateCondition, queryOptions);
};

export const updateLastAciveTimeForTheUser = async (id) => {
  try {
    const updateCondition = {
      $set: {
        lastLogin: Date.now(),
      },
    };
    const queryOptions = { upsert: false };
    return await updateUserDetails(id, updateCondition, queryOptions);
  } catch (err) {
    console.log("Error while updating last login time for user=> " + err);
  }
};

export const updateUserPassword = async (id, password) => {
  try {
    const updateCondition = {
      $set: {
        password,
        resetToken: "-", // we should remove password reset token from db once password is updated
      },
    };
    const queryOptions = { upsert: false };
    const result = await updateUserDetails(id, updateCondition, queryOptions);
    cached.collections[constants.collectionMap.user.collectionName] = null
    return result
  } catch (err) {
    console.log("Error while updating last login time for user=> " + err);
  }
};

export const getUser = async (id, isDbReq = false) => {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser._id == id && isDbReq === false)
    return currentUser;
  const queryResponse = await getDocument(
    constants.collectionMap.user.collectionName,
    constants.collectionMap.user.schema,
    {
      _id: new String(id).toLowerCase(),
    }
  );

  if (!queryResponse[0]) {
    console.log("Error getting user => " + queryResponse[1]);
  }

  return queryResponse[1];
};

export const updateUserDetails = async (id, updateConition, queryOptions) => {
  return updateDocument(
    constants.collectionMap.user.collectionName,
    constants.collectionMap.user.schema,
    { _id: new String(id).toLowerCase() },
    updateConition,
    queryOptions
  );
};

export const getTokenFromCookie = (httpReq) => {
  if (httpReq.cookies) {
    return httpReq.cookies[process.env.cookieName];
  }
  let rawCookie = httpReq.headers?.cookie;
  return rawCookie[process.env.cookieName]; // jwt cookie
};

export const updateTokenInCookie = (httpRes, jwtToken) => {
  deleteTokenFromCookie(httpRes);
  saveTokenInCookie(httpRes, jwtToken);
};

export const saveTokenInCookie = (httpRes, jwtToken) => {
  const secure = isProductionEnv === "production" ? `Secure=true;` : "";
  const cookie = `${process.env.cookieName}=${jwtToken}; Max-Age=${process.env.cookieExpiryTime}; HttpOnly=true;${secure}Path=/;SameSite=Lax`;
  httpRes.setHeader("Set-cookie", [cookie]);
  return httpRes;
};

export const deleteTokenFromCookie = (httpRes) => {
  let cookie = `${process.env.cookieName}='';Max-Age=0;Path=/;SameSite=Lax`;
  httpRes.setHeader("Set-cookie", cookie);
  console.log("Rmoved token from the cookie");
  return httpRes;
};

export const encodePayload = (payload, expiryTime) => {
  try {
    return encodeURIComponent(
      jwt.sign(
        payload,
        process.env.hashSecret,
        { expiresIn: expiryTime },
        { algorithm: "RS256" }
      )
    );
  } catch (err) {
    console.log("Error while encoding JWT => " + err);
  }
  return null;
};

export const decodePayload = (token) => {
  try {
    var decoded = jwt.verify(decodeURIComponent(token), process.env.hashSecret);
    return decoded;
  } catch (err) {
    console.log("Error while decodind JWT => " + err);
  }
  return null;
};

export const getCurrentUser = () => {
  if (cached.user) {
    console.log("Current User exists in the global scope.");
    return cached.user;
  }

  console.log(
    "Current User doesn't exists in the global scope. Returning null"
  );

  return undefined;
};

export const updateCurrentUserInGlobalScope = (userDetails) => {
  cached.user = userDetails;
  console.log("Updated Current User in Global Scope.");
};

export const removeCurrentUserFromGlobalScope = () => {
  console.log("Removing Current User form Global Scope.User");
  updateCurrentUserInGlobalScope(null);
};

export const sendMail = async (toAddress, mailSubject, mailBody) => {
  const transporter = nodemailer.createTransport({
    service: process.env.mailService,
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPassword,
    },
  });

  const mailOption = {
    from: process.env.mailUser,
    to: toAddress,
    subject: mailSubject,
    text: mailBody,
  };

  await transporter
    .sendMail(mailOption)
    .then((res) => {
      console.log("Mail successfully sent => " + JSON.stringify(res));
    })
    .catch((err) => {
      console.log("Error while sending mail => " + err);
    });
};

export const getMailBody = (httpReq, mailType, path = "", token = "") => {
  const host = process.env.domainUrl;
  const link = `http://${host}${path}${token}`;
  return `${mailType}`.replace("<link>", link);
};
