import axios from "axios";
const BASE_URL="https://onlinequiz-production-ce55.up.railway.app/question";
const token=localStorage.getItem("token");
export const createQuestion=async(data)=>
{
    return axios.post(`${BASE_URL}/add`,data,{headers:{
        'Content-Type':'application/json',
         'Authorization':`Bearer ${token}`
       
}});
}
export const getQuestions=async()=>{
    return axios.get(`${BASE_URL}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
export const getQuestionById=async(id)=>{
    return axios.get(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
export const editQuestion=async(id,data)=>{
    return axios.patch(`${BASE_URL}/${id}`,data,{
        headers:{
            'Content-Type':'application/json',
             'Authorization':`Bearer ${token}`
        }
    });
}
export const getQuestionByQuizId=async(id)=>{
    return axios.get(`${BASE_URL}/quizId/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
export const deleteQuestion=async(id)=>{
    return axios.delete(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}

