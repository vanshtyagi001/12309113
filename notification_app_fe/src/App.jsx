import {useState,useEffect} from 'react';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import {AppBar,Toolbar,Typography,Button,Container} from '@mui/material';
import Priority from './pages/Priority';
import AllNotes from './pages/AllNotes';
import Login from './pages/Login';
import {logout} from './services/authService';

function App(){
  const [auth,setAuth]=useState(false);

  useEffect(()=>{
    let token=localStorage.getItem('bearerToken');
    if(token) setAuth(true);
  },[]);

  const handleLogout=()=>{
    logout();
    setAuth(false);
  }

  if(!auth){
    return <Login onAuth={setAuth}/>
  }

  return(
    <BrowserRouter>
      <AppBar position="static" sx={{mb:4}}>
        <Toolbar>
          <Typography variant="h6" sx={{flexGrow:1,fontWeight:'bold'}}>
            Campus Portal
          </Typography>
          <Button color="inherit" component={Link} to="/">Priority</Button>
          <Button color="inherit" component={Link} to="/all">Archive</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<Priority/>}/>
          <Route path="/all" element={<AllNotes/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
export default App;