import axios from "./axios";
import { userDecode } from "../utils/userDecode";
import now from "../utils/Date";


export const sendmessage = async(e,message,group,messages)=>{
    e.preventDefault();
    var prevmsgs = messages;
    const token = localStorage.getItem("UserDetails");
    var user = userDecode(JSON.parse(token).user);
    prevmsgs.push({
        user:user,
        message:message,
        timestamp:now
    })
    const data = await axios.post('/sendmessage',{
        body:{
            message:message,
            user:user,
            timestamp:now,
            group:group
        }
    })
    return messages;
}