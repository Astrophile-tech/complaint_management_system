import { useState, useMemo } from 'react';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  Card, CardContent, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Button, TextField, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, STATUS_LIST, CAT_ICONS } from '../utils/Constants';
import statusChip from '../utils/Helpers';

const FilterInterface = ({ complaints }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [status, setStatus]     = useState('');
  const [search, setSearch]     = useState('');

  const filtered = useMemo(() => {
    return complaints.filter(c => {
      const matchCat    = !category || c.category === category;
      const matchStatus = !status   || c.status   === status;
      const matchSearch = !search   ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [complaints, category, status, search]);

  const clearFilters = () => { setCategory(''); setStatus(''); setSearch(''); };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Filter Complaints</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Showing {filtered.length} of {complaints.length} complaints
      </Typography>

      {/* Filter controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
            <TextField
              placeholder="Search title or description…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="small"
              sx={{ minWidth: 240 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Category</InputLabel>
              <Select value={category} label="Category" onChange={e => setCategory(e.target.value)}>
                <MenuItem value="">All Categories</MenuItem>
                {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select value={status} label="Status" onChange={e => setStatus(e.target.value)}>
                <MenuItem value="">All Statuses</MenuItem>
                {STATUS_LIST.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>

            {(category || status || search) && (
              <Button variant="outlined" size="small" onClick={clearFilters}>Clear</Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Results table */}
      <TableContainer component={Card}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0f4f8' }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Details</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">No complaints match the current filters.</TableCell>
              </TableRow>
            ) : (
              filtered.map(c => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{c.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${CAT_ICONS[c.category] ?? '📋'} ${c.category}`}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{c.createdDate}</TableCell>
                  <TableCell>{statusChip(c.status)}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined"
                      onClick={() => navigate('/details', { state: c })}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FilterInterface;
