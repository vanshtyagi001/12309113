import {useState,useEffect} from 'react';
import {getNotes} from '../api/notifications';
import {getReadIds} from '../utils/storage';
import {logError,logOperation} from '../utils/logger';
import NoteCard from '../components/NoteCard';
import {CircularProgress,Typography,Box} from '@mui/material';

const Priority=()=>{
  const [notes,setNotes]=useState([]);
  const [load,setLoad]=useState(true);
  const [err,setErr]=useState('');

  useEffect(()=>{
    const fetchTop=async()=>{
      try{
        setLoad(true);
        let data=await getNotes();
        let read=getReadIds();
        let unread=data.filter(n=>!read.includes(n.id)).slice(0,10);
        setNotes(unread);
        logOperation('loaded priority notes',{count:unread.length});
      }catch(e){
        setErr('failed to load notes');
        logError('priority fail',e);
      }finally{
        setLoad(false);
      }
    }
    fetchTop();
  },[]);

  if(load) return <Box sx={{display:'flex',justifyContent:'center',mt:4}}><CircularProgress/></Box>;
  if(err) return <Typography color="error" sx={{mt:2}}>{err}</Typography>;

  return(
    <Box>
      <Typography variant="h5" sx={{mb:3}}>Top Priority Updates</Typography>
      {notes.length===0?<Typography>No new high priority notices.</Typography>:
        notes.map(n=><NoteCard key={n.id} note={n} isRead={false} onRead={(id)=>setNotes(notes.filter(x=>x.id!==id))}/>)
      }
    </Box>
  )
}
export default Priority;