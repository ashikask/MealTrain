import {
  userDetailsService,
  providerService,
  studentService,
  authService,
} from "../services/index.js";
import formatError from "mongoose-error-formatter";
import { UserDetails } from "../models/index.js";

/**
 *
 * @param {*} error
 * Setting error status code and error message
 * @param {*} response
 */
const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};
/**
 *
 * @param {*} obj
 * Setting success error code and response
 * @param {*} response
 */
const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

export const addUserDetails = async (req, res) => {
  const userDetails = req.body;
  const userAccountId = req.body.userAccountId;
  try {
    const user = await userDetailsService.addUserDetails(userDetails);
    const userAccount = await authService.getUserAccountById(userAccountId);
    userAccount.userDetailsId = user.id;
    const updateUserAccount = await authService.updateUserAccountById(
      userAccount
    );
    let entityDetails = {};
    let updatedUser = JSON.parse(JSON.stringify(user));
    if (userAccount.role == "provider") {
      //if profile is of provider
      entityDetails = createProvider(userDetails);
      entityDetails = await providerService.save(entityDetails);
      updatedUser.providerId = entityDetails.id;
      const updatedUserDetails = await userDetailsService.updateUserDetailsById(
        updatedUser
      );
      
      updatedUser.imagePath = entityDetails.businessImage;
      updatedUser.name = entityDetails.name;
      updatedUser.shortDescription = entityDetails.shortDescription;
      updatedUser.description = entityDetails.description;
    } else {
      //if profile is of student
      entityDetails = createStudent(userDetails);
      entityDetails = await studentService.save(entityDetails);
      updatedUser.studentId = entityDetails.id;
      const updatedUserDetails = await userDetailsService.updateUserDetailsById(
        updatedUser
      );
      updatedUser.imagePath = entityDetails.image;
    }

    
    setSuccessResponse(formatResponse(updatedUser), res);
  } catch (err) {
    setErrorResponse({ message: formatError(err) }, res);
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userDetailsId = req.params.userId;
    const updatedDetails = { ...req.body };
    const userAccountId = updatedDetails.userAccountId;
    const userAccount = await authService.getUserAccountById(userAccountId);
    const providerId = updatedDetails.providerId;
    const studentId = updatedDetails.studentId;
    updatedDetails.id = userDetailsId;
    const user = await userDetailsService.updateUserDetailsById(updatedDetails);
    let entityDetails = {};
    let updatedUser = JSON.parse(JSON.stringify(user));
    const provider = await providerService.findOne(providerId);
    if (userAccount.role == "provider") {
      //if profile is of provider
      entityDetails = createProvider(updatedDetails);
      entityDetails.id= providerId ;
      entityDetails = await providerService.updateUserDetailsById(
        entityDetails
      );

      updatedUser.providerId = entityDetails.id;
      updatedUser.imagePath = entityDetails.businessImage;
      updatedUser.name = entityDetails.name;
      updatedUser.shortDescription = entityDetails.shortDescription;
      updatedUser.description = entityDetails.description;
    } else {
      //if profile is of student
      entityDetails = createStudent(updatedDetails);
      entityDetails.id= studentId;
      entityDetails = await studentService.updateUserDetailsById(
        entityDetails
      );
      updatedUser.studentId = entityDetails.id;
      updatedUser.imagePath = entityDetails.image;
    }
    setSuccessResponse(formatResponse(updatedUser), res);
  } catch (error) {
    setErrorResponse(error, res);
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userDetailsId = req.params.userId;
    const userAccountId = req.query.userAccountId;
    const userAccount = await authService.getUserAccountById(userAccountId);
    const user = await userDetailsService.getUserDetailsById(userDetailsId);
    if (!user)
      return setErrorResponse(
        { message: "User does not exist with the given details" },
        res,
        404
      ); //Conflict

    let entityDetails = {};
    let updatedUser = JSON.parse(JSON.stringify(user));
    if (userAccount.role == "provider") {
      //if profile is of provider
      entityDetails = await providerService.findOne(user.providerId);
     
      updatedUser.imagePath = entityDetails.businessImage;
      updatedUser.name = entityDetails.name;
      updatedUser.shortDescription = entityDetails.shortDescription;
      updatedUser.description = entityDetails.description;
    } else {
      //if profile is of student
      entityDetails = await studentService.findOne(user.studentId);
      updatedUser['imagePath'] = entityDetails.image;
      
    }
    setSuccessResponse(formatResponse(updatedUser), res);
  } catch (error) {
    setErrorResponse(error, res);
  }
};

const createProvider = (data) => {
  const providerObj = {
    name: data.name,
    businessImage: data.imagePath,
    minOfferingPrice: 0,
    shortDescription:data.shortDescription,
    description:data.description
  };
  return providerObj;
};

const createStudent = (data) => {
  const studentObj = {
    name: data.firstname + " " + data.lastname,
    image: data.imagePath,
  };
  return studentObj;
};

const formatResponse = (user) => {
  // const userDetails = { ...user };
  // return userDetails;
  return user;
};
