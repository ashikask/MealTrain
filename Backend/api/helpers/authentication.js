import jsonwebtoken from "jsonwebtoken";
import config from "../../config/config.js";
const { secretKeyJWT, secretKeyRefresh, secretKeyResetPassword } = config.API;

/** @function createToken
 * @desc This function is used to create token for the user
 * @param {JSON object} user includes user details
 * @return {String} token
 */
export const createToken = async (userDetails, isAccessToken) => {
  const secretKey = isAccessToken ? secretKeyJWT : secretKeyRefresh;
  const token = await jsonwebtoken.sign(
    {
      username: userDetails.username,
      id: userDetails.id,
      role: userDetails.role,
    },
    secretKey,
    {
      expiresIn: isAccessToken ? "2m" : "1d",
    }
  );
  return token;
};

/** @function authenticateUser
 * @desc This function is used for authenticating the user.
 * @param {String} token user's token
 */
export const authenticateUser = async (token) => {
  try {
    const result = await jsonwebtoken.verify(token, secretKeyJWT);
    return result;
  } catch (err) {
    return err.message;
  }
};


/************************************************************************/


/**
 * 
 * @param {*} userDetails 
 * @returns 
 */
export const createResetPasswordToken = async (userDetails) => {
    const token = await jsonwebtoken.sign(
      {
        username: userDetails.username,
        id: userDetails.id,
      },
      secretKeyResetPassword,
      {
        expiresIn: "10m",
      }
    );
    return token;
  };
  


/**
 * 
 * @param {*} token 
 * @returns 
 */
export const authenticateResetPasswordToken = async (token) => {
  try {
    const result = await jsonwebtoken.verify(token, secretKeyResetPassword);
    return result;
  } catch (err) {
    return err.message;
  }
};
