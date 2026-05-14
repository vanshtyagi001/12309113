require('dotenv').config();
const express=require('express');
const cors=require('cors');
const axios=require('axios');
const {logInfo,logErr}=require('../logging_middleware/serverLogger');

const app=express();
app.use(cors());
app.use(express.json());

const BASE_URL=process.env.EVAL_API_URL;

app.post('/api/auth/register',async(req,res)=>{
  try{
    logInfo('fwd register api',req.body);
    let out=await axios.post(`${BASE_URL}/register`,req.body);
    res.json(out.data);
  }catch(e){
    logErr('register fail',e);
    res.status(500).json({error:'reg err'});
  }
});

app.post('/api/auth/login',async(req,res)=>{
  try{
    logInfo('fwd login api');
    let out=await axios.post(`${BASE_URL}/login`,req.body);
    res.json(out.data);
  }catch(e){
    logErr('login fail',e);
    res.status(500).json({error:'login err'});
  }
});

app.get('/api/notifications',async(req,res)=>{
  try{
    let token=req.headers.authorization;
    logInfo('fwd notes api',req.query);
    let out=await axios.get(`${BASE_URL}/notifications`,{
      headers:{Authorization:token},
      params:req.query
    });
    res.json(out.data);
  }catch(e){
    logErr('notes fail',e);
    res.status(500).json({error:'fetch err'});
  }
});

const port=process.env.PORT||8080;
app.listen(port,()=>{
  logInfo('server started',{port});
});