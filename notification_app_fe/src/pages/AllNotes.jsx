import {useState,useEffect} from 'react';
import {getNotes} from '../api/notifications';
import {getReadIds} from '../utils/storage';
import {logError,logOperation} from '../utils/logger';
import NoteCard from '../components/NoteCard';
import {CircularProgress,Typography,Box,Button,Select,MenuItem} from '@mui/material';

const AllNotes=()=>{
  const [notes,setNotes]=useState([]);
  const [load,setLoad]=useState(true);
  const [err,setErr]=useState('');
  const [pg,setPg]=useState(1);
  const [type,setType]=useState('');
  const [readIds,setReadIds]=useState(getReadIds());

  useEffect(()=>{
    const loadData=async()=>{
      try{
        setLoad(true);
        let params={page:pg,limit:10};
        if(type) params.notification_type=type;
        let data=await getNotes(params);
        setNotes(data);
        logOperation('loaded all notes',{pg,type});
      }catch(e){
        setErr('error loading notes');
        logError('all notes fail',e);
      }finally{
        setLoad(false);
      }
    }
    loadData();
  },[pg,type]);

  const handleRead=(id)=>{
    setReadIds([...readIds,id]);
  }

  return(
    <Box>
      <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:3}}>
        <Typography variant="h5">All Notices</Typography>
        <Select value={type} onChange={e=>{setType(e.target.value);setPg(1);}} displayEmpty size="small" sx={{minWidth:120}}>
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </Box>
      
      {load?<Box sx={{display:'flex',justifyContent:'center',mt:4}}><CircularProgress/></Box>:
       err?<Typography color="error">{err}</Typography>:
       notes.map(n=><NoteCard key={n.id} note={n} isRead={readIds.includes(n.id)} onRead={handleRead}/>)
      }

      <Box sx={{mt:3,mb:4,display:'flex',justifyContent:'center',alignItems:'center',gap:3}}>
        <Button variant="contained" disabled={pg===1} onClick={()=>setPg(p=>p-1)}>Prev</Button>
        <Typography>Page {pg}</Typography>
        <Button variant="contained" disabled={notes.length<10} onClick={()=>setPg(p=>p+1)}>Next</Button>
      </Box>
    </Box>
  )
}
export default AllNotes;