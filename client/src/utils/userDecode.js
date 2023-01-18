// JWT to decode the token
import jwtDecode from "jwt-decode";

export const userDecode = (token)=>{
    const user = jwtDecode(token);
    return user;
}