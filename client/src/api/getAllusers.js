import axios from "./axios";

export const GetAllusers = async ()=>{
    const response = await axios.get('/allusers')
    const data = await response.data;
    return data;
}   