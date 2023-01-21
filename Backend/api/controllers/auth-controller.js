import { authService } from "../services/index.js";
import { encryption, authentication } from "../helpers/index.js";
import formatError from "mongoose-error-formatter";
import { UserAccounts } from "../models/index.js";
import { sendResetPasswordEmail ,sendPasswordResetConfirmationEmail} from "../helpers/mail-handler.js";

/**
 *
 * @param {*} error
 * Setting error status code and error message
 * @param {*} response
 */
const setErrorResponse = (error, response, status) => {
  status = status || 500;
  response.status(status);
  response.json(error);
};
/**
 *
 * @param {*} obj
 * Setting success error code and response
 * @param {*} response
 */
const setSuccessResponse = (obj, response, status) => {
  status = status || 200;
  response.status(status);
  response.json(obj);
};

export const registerUser = async (req, res) => {
  const { username, password, role, email } = req.body;
  // missing fields
  if (!username || !password) {
    return setErrorResponse(
      { message: "Username and Password are required." },
      res,
      400
    );
  }

  // checking for duplicate usernames in the db
  const duplicate = await authService.findUser(username);
  if (duplicate)
    return setErrorResponse(
      { message: "Username already exists. Give a unique username." },
      res,
      409
    ); //Conflict

  try {
    //encrypt the password
    const hashedPassword = await encryption.encryptPassword(password);

    //create and store the new user
    const userDetail = {
      username,
      password: hashedPassword,
      role,
      email,
    };

    const user = await authService.registerUser(userDetail);
    setSuccessResponse({ message: "User registered successfully!" }, res);
  } catch (err) {
    setErrorResponse({ message: formatError(err) }, res);
  }
};

export const login = async (req, res) => {
  const { username, password, role } = req.body;
  // missing fields
  if (!username || !password) {
    return setErrorResponse(
      { message: "Username and Password are required." },
      res,
      400
    );
  }

  const foundUser = await authService.findUser(username);
  if (!foundUser)
    return setErrorResponse(
      { message: "User does not exist with the given credentials" },
      res,
      401
    ); //Conflict

  // evaluate password
  try {
    const isSamePassword = await encryption.comparePassword(
      password,
      foundUser.password
    );
    if (!isSamePassword)
      return setErrorResponse({ message: "Password is incorrect." }, res, 401); //Conflict
    const accessToken = await authentication.createToken(
      {
        username: foundUser.username,
        id: foundUser.id,
        role: foundUser.role,
      },
      true
    );
    const refreshToken = await authentication.createToken(
      {
        username: foundUser.username,
        id: foundUser.id,
        role: foundUser.role,
      },
      false
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await authService.updateUserAccountById(foundUser);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    const responseData = {
      accessToken,
      user: foundUser,
    };
    setSuccessResponse(responseData, res);
  } catch (err) {
    setErrorResponse({ message: formatError(err) }, res);
  }
};

export const refreshToken = async (req, res) => {
  if (!req.cookies?.jwt)
    return setErrorResponse({ message: "User is not authorized." }, res, 401); //unauthorized
  const refreshToken = req.cookies?.jwt; //cookies.jwt;
  // // missing fields
  // if (!username || !password) {
  //     return setErrorResponse({ 'message': 'Username and Password are required.' }, res, 400);
  // }

  try {
    //check if refresh token is in db
    const query = {};
    query.refreshToken = refreshToken;
    const foundUser = await authService.search(query);
    if (!foundUser)
      return setErrorResponse({ message: "User is not authorized" }, res, 403);

    const accessToken = await authentication.createToken(
      {
        username: foundUser.username,
        id: foundUser._id,
        role: foundUser.role,
      },
      true
    );

    // Send authorization roles and access token to user
    const responseData = {
      accessToken,
      id: foundUser._id,
    };
    setSuccessResponse(responseData, res);
  } catch (err) {
    setErrorResponse({ message: formatError(err) }, res);
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  // missing field
  if (!email) {
    return setErrorResponse({ message: "Email is required." }, res, 400);
  }
  try {
    const query = {};
    query.email = email;
    const foundUser = await authService.search(query);

    if (!foundUser)
      return setErrorResponse(
        { message: "User does not exist with the given email address" },
        res,
        401
      ); //Conflict
    const resetPasswordToken = await authentication.createResetPasswordToken(
      {
        username: foundUser.username,
        id: foundUser.id,
      },
      true
    );
    const emailConfig = {
      receiver: email,
      username: foundUser.username,
      token: resetPasswordToken,
      id:foundUser.id
    };
    const result = await sendResetPasswordEmail(emailConfig);
    setSuccessResponse({
      message: "Please check your mail. You have got a password reset link",
    },res);
  } catch (err) {
    setErrorResponse({ message: formatError(err) }, res);
  }
};

export const resetPassword = async (req, res) => {
  const { userId, password } = req.body;
  // missing field
  if (!password) {
    return setErrorResponse({ message: "Password is required." }, res, 400);
  }
  try {
    const query = {};
    query._id = userId;
    const foundUser = await authService.search(query);
    if (!foundUser)
      return setErrorResponse(
        { message: "User does not exist with the given details" },
        res,
        401
      ); //Conflict

    //encrypt the new password
    const hashedPassword = await encryption.encryptPassword(password);
    foundUser.password = hashedPassword;
    const updatedData = await authService.updateUserAccountById(foundUser);
    const emailConfig = {
      receiver: foundUser.email,
      username: foundUser.username,
      id:foundUser.id
    };
    const result = await sendPasswordResetConfirmationEmail(emailConfig);
    setSuccessResponse({
      message: "Password Reset Successfully",
    },res);
  } catch (err) {
    setErrorResponse({ message: err  }, res);
  }
};

export const logOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return setSuccessResponse({ message: "No Token exists." }, res, 204); //No content
  const refreshToken = cookies.jwt;
  try {
    //check if refresh token is in db
    const query = {};
    query.refreshToken = refreshToken;
    const foundUser = await authService.search(query);
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return setSuccessResponse(
        { message: "Token doesn't exist in cookie" },
        res,
        204
      );
    }
    //deleting refresh token in db
    foundUser.refreshToken = "";
    const result = await authService.updateUserAccountById(foundUser);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    setSuccessResponse({ message: "Token deleted from cookie" }, res, 204);
  } catch (err) {
    setErrorResponse({ message: formatError(err) }, res);
  }
};

const formatResponse = (user) => {
  return {
    username: user.username,
    role: user.role,
    email: user.email,
    id: user.id,
  };
};
