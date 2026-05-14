import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import {AppBar,Toolbar,Typography,Button,Container} from '@mui/material';
import Priority from './pages/Priority';
import AllNotes from './pages/AllNotes';

function App(){
  return(
    <BrowserRouter>
      <AppBar position="static" sx={{mb:4}}>
        <Toolbar>
          <Typography variant="h6" sx={{flexGrow:1,fontWeight:'bold'}}>
            Campus Portal
          </Typography>
          <Button color="inherit" component={Link} to="/">Priority</Button>
          <Button color="inherit" component={Link} to="/all">Archive</Button>
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