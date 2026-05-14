import {Card,CardContent,Typography,Button,Box} from '@mui/material';
import {markRead} from '../utils/storage';

const NoteCard=({note,isRead,onRead})=>{
  const handleRead=()=>{
    markRead(note.id);
    if(onRead) onRead(note.id);
  }
  return(
    <Card sx={{mb:2,bgcolor:isRead?'#f5f5f5':'#ffffff',borderLeft:isRead?'none':'4px solid #1976d2'}}>
      <CardContent>
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
          <Typography variant="h6">{note.title||'Notice'}</Typography>
          <Typography variant="caption" sx={{p:0.5,bgcolor:'#e0e0e0',borderRadius:1}}>
            {note.notification_type}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{mt:1,mb:1}}>{note.message}</Typography>
        {!isRead&&<Button onClick={handleRead} size="small" variant="outlined">Mark Read</Button>}
      </CardContent>
    </Card>
  )
}
export default NoteCard;