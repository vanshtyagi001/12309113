import axios from 'axios';
import {Log} from '../../../logging_middleware/logger';

const apiClient=axios.create({
  baseURL:'http://4.224.186.213/evaluation-service',
  timeout:10000,
});

apiClient.interceptors.request.use((config)=>{
  let token=localStorage.getItem('bearerToken');
  if(token) config.headers.Authorization=`Bearer ${token}`;
  Log('frontend','info','api',`requesting ${config.url}`);
  return config;
},(error)=>{
  Log('frontend','error','api','request failed');
  return Promise.reject(error);
});

apiClient.interceptors.response.use((res)=>{
  Log('frontend','info','api',`response success ${res.config.url}`);
  return res;
},(error)=>{
  Log('frontend','error','api','response error');
  return Promise.reject(error);
});

export default apiClient;