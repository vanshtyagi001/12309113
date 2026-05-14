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
        {/* THIS WILL PRINT THE RAW SERVER DATA ON THE SCREEN */}
        <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
          {JSON.stringify(note)}
        </Typography>
        
        {!isRead&&<Button onClick={handleRead} size="small" variant="outlined" sx={{mt: 2}}>Mark Read</Button>}
      </CardContent>
    </Card>
  )
}
export default NoteCard;