import axios from "./axios";

export const SignIn = async (userdetails,event)=>{
    event.preventDefault();
    const response = await axios.post('/signin',{
        body:userdetails
    })
    const data = await response.data;
    localStorage.setItem("UserDetails",JSON.stringify(data));
    return data;
}   