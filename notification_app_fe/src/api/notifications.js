import apiClient from './axiosConfig';
import {Log} from '../../../logging_middleware/logger';

const getPriority=(type)=>{
  if(type==='Placement') return 3;
  if(type==='Result') return 2;
  return 1;
}

export const getNotes=async(params={})=>{
  try{
    Log('frontend','info','api','fetching notifications');
    let res=await apiClient.get('/notifications',{params});
    
    // Safely extract the array no matter how the evaluation server formats it
    let items=[];
    if(Array.isArray(res.data)){
      items=res.data;
    }else if(res.data && Array.isArray(res.data.data)){
      items=res.data.data;
    }else if(res.data && Array.isArray(res.data.notifications)){
      items=res.data.notifications;
    }else if(res.data && Array.isArray(res.data.content)){
      items=res.data.content;
    }

    items.sort((a,b)=>getPriority(b.notification_type)-getPriority(a.notification_type));
    Log('frontend','info','api','sorted notifications successfully');
    
    return items;
  }catch(e){
    Log('frontend','error','api','failed to fetch notifications');
    throw e;
  }
}