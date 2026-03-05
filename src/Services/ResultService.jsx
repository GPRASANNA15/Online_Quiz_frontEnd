import axios from "axios";
const BASE_URL="https://onlinequiz-production-2d13.up.railway.app/result";
const token=localStorage.getItem("token");
export const generateResult=async(data)=>{
    return axios.post(`${BASE_URL}/add`,data,{
        headers:{
            'Content-Type':'application/json',
             'Authorization':`Bearer ${token}`
        }
    });
}
