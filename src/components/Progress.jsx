import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const  Progress =()=> {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '80%' }}>
      <CircularProgress />
    </Box>
  );
}

export default Progress
