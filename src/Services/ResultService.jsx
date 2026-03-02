import axios from "axios";
const BASE_URL="http://localhost:8080/result";
const token=localStorage.getItem("token");
export const generateResult=async(data)=>{
    return axios.post(`${BASE_URL}/add`,data,{
        headers:{
            'Content-Type':'application/json',
             'Authorization':`Bearer ${token}`
        }
    });
}