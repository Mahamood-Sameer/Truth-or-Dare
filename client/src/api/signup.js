import axios from "./axios";

export const SignUp = async (userdetails,event)=>{
    event.preventDefault();
    const response = await axios.post('/signup',{
        body:userdetails
    })
    const data = await response.data;
    localStorage.setItem("UserDetails",JSON.stringify(data));
    return data;
}   