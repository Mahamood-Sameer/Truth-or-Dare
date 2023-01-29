import axios from "./axios";

export const getgroups = async () =>{
    var token = localStorage.getItem("UserDetails")
    const resposne = await axios.get('/mygroups',{
        headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
    })

    const grps = resposne.data.groups;
    return grps;
}