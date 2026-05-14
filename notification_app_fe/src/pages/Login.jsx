import {useState} from 'react';
import {Box,Button,TextField,Typography,CircularProgress,Paper} from '@mui/material';
import {registerClient,authenticateClient} from '../services/authService';

const Login=({onAuth})=>{
  const [email,setEmail]=useState('');
  const [roll,setRoll]=useState('');
  const [load,setLoad]=useState(false);
  const [err,setErr]=useState('');

  const handleLogin=async(e)=>{
    e.preventDefault();
    if(!email||!roll){
      setErr('Enter email and roll number');
      return;
    }
    try{
      setLoad(true);
      setErr('');
      await registerClient({companyName:"Campus Portal",ownerName:roll,ownerEmail:email,rollNo:roll});
      let tkn=await authenticateClient();
      if(tkn) onAuth(true);
    }catch(error){
      setErr('Login failed. Check connection.');
    }finally{
      setLoad(false);
    }
  }

  return(
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
      <Paper sx={{p:4,width:'100%',maxWidth:400,textAlign:'center'}}>
        <Typography variant="h5" sx={{mb:3}}>Portal Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField fullWidth label="Email" sx={{mb:2}} value={email} onChange={e=>setEmail(e.target.value)}/>
          <TextField fullWidth label="Roll Number" sx={{mb:3}} value={roll} onChange={e=>setRoll(e.target.value)}/>
          {err&&<Typography color="error" sx={{mb:2}}>{err}</Typography>}
          <Button fullWidth variant="contained" type="submit" disabled={load}>
            {load?<CircularProgress size={24}/>:'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
export default Login;