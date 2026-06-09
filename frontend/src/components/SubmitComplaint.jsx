import { useState } from 'react'
import { Box, Typography, TextField, MenuItem, Button, Card, CardContent } from '@mui/material'
import { CATEGORIES } from '../utils/Constants'

function SubmitComplaint() {
  const [values, setValues] = useState({ title: '', category: '', location: '', description: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = field => event => {
    setValues(prev => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={1}>Submit a New Complaint</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Fill in the details below to add a complaint to the system.
      </Typography>

      <Card>
        <CardContent>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField
              label="Complaint Title"
              value={values.title}
              onChange={handleChange('title')}
              required
              fullWidth
            />
            <TextField
              label="Category"
              select
              value={values.category}
              onChange={handleChange('category')}
              required
              fullWidth
            >
              {CATEGORIES.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Location"
              value={values.location}
              onChange={handleChange('location')}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={values.description}
              onChange={handleChange('description')}
              required
              multiline
              minRows={4}
              fullWidth
            />
            <Button type="submit" variant="contained" sx={{ width: 160 }}>
              Submit Complaint
            </Button>
          </Box>

          {submitted && (
            <Box mt={3} p={2} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' }}>
              <Typography variant="subtitle1" gutterBottom>Complaint Submitted</Typography>
              <Typography variant="body2" color="text.secondary">
                Your complaint has been recorded in the frontend demo. Reload the page to start a new submission.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default SubmitComplaint
