// JWT decode token
import jwt from 'jsonwebtoken'

export const DecodeToken = (token)=>{
    const user = jwt.decode(token);
    return user;
}