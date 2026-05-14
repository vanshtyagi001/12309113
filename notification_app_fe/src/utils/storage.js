import {Log} from '../../../logging_middleware/logger';

export const getReadIds=()=>{
  let data=localStorage.getItem('read_notes');
  return data?JSON.parse(data):[];
}

export const markRead=(id)=>{
  let ids=getReadIds();
  if(!ids.includes(id)){
    ids.push(id);
    localStorage.setItem('read_notes',JSON.stringify(ids));
    Log('frontend','info','utils','notification marked as read');
  }
}