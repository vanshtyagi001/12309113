export const Log=async(stack,level,pkg,message)=>{
  try{
    let token=localStorage.getItem('bearerToken');
    if(!token)return;
    await fetch('/evaluation-service/logs',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body:JSON.stringify({stack,level,package:pkg,message})
    });
  }catch(e){}
}