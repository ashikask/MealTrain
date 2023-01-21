import { authentication } from "../helpers/index.js";

const verifyToken = (req, res, next) => {
  const userId = req.body.userAccountId || req.query.userAccountId; //req.body.id || req.params.id;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "User is not authorized" });
  }
  const token = authHeader.split(" ")[1];
  if (token) {
    authentication
      .authenticateUser(token)
      .then((decode) => {
        if (decode === "jwt expired") {
          return res.status(401).json({ message: "Token Expired" });
        } else if (decode.id && decode.id === userId) {
          req.body.username = decode.username;
          req.body.userId = decode.id;
          next();
        } else {
          return res.status(401).json({ message: "Invalid User" }); //changed
        }
      })
      .catch((error) => {
        return res.status(403).json({ message: "Invalid Access Token" });
      });
  } else {
    return res.status(401).json({ message: "No Token provided" });
  }
};

const verifyResetPasswordToken = (req, res, next) => {
  const token = req.body.token || req.query.token;
  // console.log(req.body);
  // console.log(req.query)
  const userId = req.params.id;
  if (token) {
    authentication
      .authenticateResetPasswordToken(token)
      .then((decode) => {
        if (decode === "jwt expired") {
          return res.status(401).json({ message: "Token Expired. Please request again" });
        } else if (decode.id && decode.id === userId) {
          req.body.username = decode.username;
          req.body.userId = decode.id;
          next();
        } else {
          return res.status(401).json({ message: "Invalid User" }); //changed
        }
      })
      .catch((error) => {
        return res
          .status(403)
          .json({ message: "Invalid Reset Password Token" });
      });
  } else {
    return res.status(401).json({ message: "No Token provided" });
  }
};


export default {verifyToken,verifyResetPasswordToken};
//export default { verifyToken };
