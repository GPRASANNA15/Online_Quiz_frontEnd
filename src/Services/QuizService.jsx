import axios from "axios";
const BASE_URL="https://onlinequiz-production-ce55.up.railway.app/quiz";
const token=localStorage.getItem("token");
export const addQuiz=async(data)=>{
    return axios.post(`${BASE_URL}/add`,data,{
        headers:{
            'Content-Type':'application/json',
             'Authorization':`Bearer ${token}`
        }
    });
}

export const getAllQuiz=async()=>{
    return axios.get(`${BASE_URL}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}

export const getQuizById=async(id)=>{
    return axios.get(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
export const updateQuiz=async(id,data)=>{
    return axios.patch(`${BASE_URL}/${id}`,data,{
        headers:{
            'Content-Type':'application/json',
             'Authorization':`Bearer ${token}`
        }
    });
}

export const deleteQuiz=async(id)=>{
    return axios.delete(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
