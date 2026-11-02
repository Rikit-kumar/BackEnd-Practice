import api from "./api"

export const registerUserApi = async (data)=>{
    const response = api.post('/auth/register', data);
    return response.data
}

export const loginUserApi = async (data)=>{
    const response = api.post("/auth/login", data);
    return response.data
}