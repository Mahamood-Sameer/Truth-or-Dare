import axios from "./axios";

export const Logout =(userdetails)=>{
    axios.get('/logout').then((response)=>{
        
    }).catch((error)=>{
        
    })
}