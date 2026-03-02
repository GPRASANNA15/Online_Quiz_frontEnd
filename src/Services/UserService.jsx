import axios from "axios";
const BASE_URL="http://localhost:8080/users";
const token=localStorage.getItem("token");
export const createUser=async(userData)=>{
    return axios.post(`${BASE_URL}/add`,userData,{
        headers:{
            'Content-Type':'application/json'
        }
    });
};
const API_URL="http://localhost:8080/admin";
export const adminUser=async(userData)=>{
    return axios.post(`${API_URL}/add`,userData,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const updateUser=async(id,userData)=>{
  return axios.patch(`${BASE_URL}/${id}`,userData,{
    headers:{
        'Content-Type':'application/json',
         'Authorization':`Bearer ${token}`
    }
  });
}

export const deleteUser=async(id)=>{
    return axios.delete(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}
export const getAllUsers=async()=>{
return axios.get(`${BASE_URL}`,{
    headers:{
         'Authorization':`Bearer ${token}`
    }
});
}
export const getUserById=async(id)=>{
    return axios.get(`${BASE_URL}/${id}`,{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    });
}

export const loginUser=async(userData)=>{
    return axios.post(`${BASE_URL}/auth`,userData,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}