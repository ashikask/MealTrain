import bcrypt from 'bcrypt';
const saltRounds = 10;



export const encryptPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
}
export const comparePassword = (userPassword, hashedPassword) => {
    return bcrypt.compare(userPassword, hashedPassword)
}






