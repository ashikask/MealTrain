import  {UserDetails as Users}  from '../models/index.js';



  
 /**
  * Get user details by id
  * @param {*} id 
  * @returns 
  */
  export const findOne = async (id) => {
    return Users.findById(id);
  };

/**
 * 
 * @param {*} username 
 * Finds a user based on username
 * @returns Promise<user>
 */
export const findUser = (username) => {
   return  Users.findOne({ username}).exec()

};

export const search = (query) => {
   const params =  {...query};
    return Users.find(params).exec();
}

/**
 * 
 * @param {*} newUser 
 * Creates a new user
 * @returns {Promise<user>}
 */
 export const addUserDetails = (newUser) => {

    const user= new Users(newUser);
    return user.save();
};

/**
 * 
 * @param {*} id 
 * Getting a user details based on the object id given in the request param
 * @returns {Promise<user>} 
*/
export const getUserDetailsById = (id)=>{
   const user= Users.findById(id).exec();
   return user;
}
/**
 * 
 * @param {*} updatedUser
 * Update a user with a updated user in request body based on id given in the request param 
 * @returns  {Promise<user>} 
 */
 export const updateUserDetailsById = (updatedUser) => {
   const user = Users.findByIdAndUpdate(updatedUser.id,updatedUser  ,{new:true }).exec();
   return user;
}