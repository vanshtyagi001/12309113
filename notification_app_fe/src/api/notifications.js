import apiClient from './axiosConfig';
import {logOperation, logError} from '../utils/logger';

const getPriority=(type)=>{
  if(type==='Placement') return 3;
  if(type==='Result') return 2;
  return 1;
}

export const getNotes=async(params={})=>{
  try{
    logOperation('fetching notes API',params);
    const res=await apiClient.get('/notifications',{params});
    let items=res.data||[];
    
    items.sort((a,b)=>getPriority(b.notification_type)-getPriority(a.notification_type));
    
    logOperation('sorted notes',{count:items.length});
    return items;
  }catch(e){
    logError('get notes error',e);
    throw e;
  }
}