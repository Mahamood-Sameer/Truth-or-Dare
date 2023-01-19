import { userDecode } from "../utils/userDecode";
import axios from "./axios"


export const creategroup = async (name,description,users)=>{
    var admin = localStorage.getItem("UserDetails");
    admin = userDecode(JSON.parse(admin).user);
    const resposne  = await axios.post('/creategroup',{
        body:{
            groupname:name,
            description:description,
            usersingroup:users,
            admin:admin
        }
    })

    const data = await resposne.data;
    return data;
}