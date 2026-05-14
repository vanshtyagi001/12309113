import apiClient from '../api/axiosConfig';
import {Log} from '../../../logging_middleware/logger';

export const authenticateClient=async(authData)=>{
  try{
    Log('frontend','info','auth','login initiated');
    let res=await apiClient.post('/auth',authData);
    
    let token=res.data.access_token;
    localStorage.setItem('bearerToken',token);
    
    Log('frontend','info','auth','login success');
    return token;
  }catch(e){
    Log('frontend','error','auth','login failed');
    throw e;
  }
}

export const logout=()=>{
  Log('frontend','info','auth','user logout');
  localStorage.removeItem('bearerToken');
}