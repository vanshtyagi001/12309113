import apiClient from '../api/axiosConfig';
import {Log} from '../../../logging_middleware/logger';

export const registerClient=async(clientData)=>{
  try{
    Log('frontend','info','auth','registration initiated');
    let res=await apiClient.post('/register',clientData);
    localStorage.setItem('clientId',res.data.clientID);
    localStorage.setItem('clientSecret',res.data.clientSecret);
    Log('frontend','info','auth','registration success');
    return res.data;
  }catch(e){
    Log('frontend','error','auth','registration failed');
    throw e;
  }
}

export const authenticateClient=async()=>{
  try{
    let clientId=localStorage.getItem('clientId');
    let clientSecret=localStorage.getItem('clientSecret');
    Log('frontend','info','auth','login initiated');
    let res=await apiClient.post('/auth',{
      email:"vansh.tyagi231@lpu.in",
      name:"vansh tyagi",
      rollNo:"12309113",
      accessCode:"TRvZWq",
      clientID:clientId,
      clientSecret:clientSecret
    });
    localStorage.setItem('bearerToken',res.data.access_token);
    Log('frontend','info','auth','login success');
    return res.data.access_token;
  }catch(e){
    Log('frontend','error','auth','login failed');
    throw e;
  }
}

export const logout=()=>{
  Log('frontend','info','auth','user logout');
  localStorage.removeItem('bearerToken');
  localStorage.removeItem('clientId');
  localStorage.removeItem('clientSecret');
}