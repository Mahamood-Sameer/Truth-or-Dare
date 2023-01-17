import axios from "./axios";

export const SignUp = async (userdetails,event)=>{
    event.preventDefault();
    const response = await axios.post('/signup',{
        body:userdetails
    })
    const data = await response.data;
    console.log("The data is:",data)
    return data;
}   