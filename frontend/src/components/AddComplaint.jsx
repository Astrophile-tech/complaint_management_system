import React from 'react'
import { AppBar, Toolbar, Typography,Container,Box, Grid, MenuItem ,} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';

const AddComplaint = () => {
  const [category, setCategory] = useState('');

  return (
    <div>
        <AppBar position="static" sx={{ backgroundColor: '#00324d' }}>
            <Toolbar>
                <Typography variant="h4"  sx={{ textAlign: 'left', ml: 3, mt: 2 , fontFamily: 'robotic',fontWeight: 'bold' }}>
                    Raise your complaint here
                </Typography>
            </Toolbar>
         </AppBar>
 <Typography variant="h6" sx={{ textAlign: 'left', ml: 3, mt: 2 , fontFamily: 'robotic',fontWeight: 'bold' }}>Complaint Submit Form</Typography>

 
 <Grid container spacing={2} sx={{ mt: 1, ml: 3, mr: 3 }}>
  
  {/* Text field for complaint id */}
    <Grid item xs={12} sm={6}>
         <Typography sx={{ mb: 1, fontSize: '14px',textAlign: 'left', ml: 3, mt: 2 , fontFamily: 'robotic',fontWeight: 'italic' }}>Complaint id</Typography>
            <TextField placeholder="complaint id"fullWidth variant="outlined" size="normal" />
   </Grid>


{/* Text field for complaint title */}
     <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1, fontSize: '14px',textAlign: 'left' , ml: 3, mt: 2 ,fontFamily: 'robotic',fontWeight: 'italic' }}>Complaint title</Typography>
             <TextField placeholder="complaint title"fullWidth variant="outlined" size="normal"/>
        </Grid>
    </Grid>

  <Grid container spacing={2} sx={{ mt: 1, ml: 3, mr: 3 }}>


    {/* Text field for complaint description */}
      <Typography sx={{ mb: 1, fontSize: '14px',textAlign: 'left' , ml: 3, mt: 2 ,fontFamily: 'robotic',fontWeight: 'italic' }}>
         Category
     </Typography>
<TextField select value={category} onChange={(e) => setCategory(e.target.value)}fullWidth variant="outlined"size="normal">
             <MenuItem value="Classroom">Classroom</MenuItem>
             <MenuItem value="Laboratory">Laboratory</MenuItem>
             <MenuItem value="Hostel">Hostel</MenuItem>
             <MenuItem value="Library">Library</MenuItem>
             <MenuItem value="Internet">Internet</MenuItem>
             <MenuItem value="Electrical">Electrical</MenuItem>
             <MenuItem value="Watersupply">Water Supply</MenuItem>
             <MenuItem value="Other">Other</MenuItem>
</TextField>


{/* Text field for complaint description */}  
<Typography sx={{ mb: 1, fontSize: '14px',textAlign: 'left' , ml: 3, mt: 2 ,fontFamily: 'robotic',fontWeight: 'italic' }}>
         Enter detailed description of your complaint
</Typography>
<TextField placeholder="complaint description"fullWidth variant="outlined" size="normal" multiline rows={4} />


{/* Text field for location */}
<Typography sx={{ mb: 1, fontSize: '14px',textAlign: 'left' , ml: 3, mt: 2 ,fontFamily: 'robotic',fontWeight: 'italic' }}>
         Location
</Typography>
<TextField placeholder="location"fullWidth variant="outlined" size="normal" />


{/* Text field for status of the complaint */}
<Typography sx={{ mb: 1, fontSize: '14px',textAlign: 'left' , ml: 3, mt: 2 ,fontFamily: 'robotic',fontWeight: 'italic' }}>
         Status of the complaint
</Typography>
<TextField select value={status} onChange={(e) => setStatus(e.target.value)}fullWidth variant="outlined"size="normal">
             <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
</TextField>


{/* Text field for date of submission */}
<Typography sx={{ mb: 1, fontSize: '14px',textAlign: 'left' , ml: 3, mt: 2 ,fontFamily: 'robotic',fontWeight: 'italic' }}>
         Date of submission
</Typography>
<TextField placeholder="date of submission"fullWidth variant="outlined" size="normal" />
</Grid>


{/* Button for submit ,edit,delete */}

<br />
<Grid container spacing={2} sx={{ mt: 1, ml: 3, mr: 3 }}>
<Grid item xs={12} sm={6}>

<Button color="secondary" variant="contained">SUBMIT</Button>
</Grid>
<Grid item xs={12} sm={6}>

<Button color="success" variant="contained">DELETE</Button>
</Grid>
<Grid item xs={12} sm={6}>

<Button color="warning" variant="contained">EDIT</Button>
</Grid>

</Grid>

    </div>
  )
}

export default AddComplaint
    
