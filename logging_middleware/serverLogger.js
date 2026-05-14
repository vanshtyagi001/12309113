const logInfo=(msg,data={})=>{
  let out=JSON.stringify({level:'INFO',time:new Date().toISOString(),msg,data})+'\n';
  process.stdout.write(out);
}
const logErr=(msg,err={})=>{
  let out=JSON.stringify({level:'ERROR',time:new Date().toISOString(),msg,err:err.message||err})+'\n';
  process.stderr.write(out);
}
module.exports={logInfo,logErr};