import {useState} from 'react';
import {Box,Button,TextField,Typography,CircularProgress,Paper} from '@mui/material';
import {authenticateClient} from '../services/authService';

const Login=({onAuth})=>{
  const [formData,setFormData]=useState({
    email:'', name:'', rollNo:'', accessCode:'', clientID:'', clientSecret:''
  });
  const [load,setLoad]=useState(false);
  const [err,setErr]=useState('');

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      setLoad(true);
      setErr('');
      let tkn=await authenticateClient(formData);
      if(tkn) onAuth(true);
    }catch(error){
      setErr('Auth failed. Check details.');
    }finally{
      setLoad(false);
    }
  }

  return(
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',py:4}}>
      <Paper sx={{p:4,width:'100%',maxWidth:450,textAlign:'center'}}>
        <Typography variant="h5" sx={{mb:3}}>Evaluation Login</Typography>
        <form onSubmit={handleLogin}>
          {Object.keys(formData).map((key)=>(
            <TextField 
              key={key} name={key} label={key} fullWidth size="small" sx={{mb:2}}
              value={formData[key]} onChange={handleChange} required
            />
          ))}
          {err&&<Typography color="error" sx={{mb:2}}>{err}</Typography>}
          <Button fullWidth variant="contained" type="submit" disabled={load}>
            {load?<CircularProgress size={24}/>:'Get Token'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
export default Login;