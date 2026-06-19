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

const FilterInterface = ({ complaints = [] }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [status,   setStatus]   = useState('');
  const [search,   setSearch]   = useState('');

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const isAdmin = currentUser?.role === 'admin';

  // Students only see their own complaints here
  const visible = useMemo(() => {
    if (isAdmin) return complaints;
    return complaints.filter(c => String(c.createdBy) === String(currentUser?.id));
  }, [complaints, isAdmin, currentUser?.id]);

  const filtered = useMemo(() => {
    return visible.filter(c => {
      const matchCat    = !category || c.category === category;
      const matchStatus = !status   || c.status   === status;
      const matchSearch = !search   ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase()) ||
        c.location?.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [visible, category, status, search]);

  const clearFilters = () => { setCategory(''); setStatus(''); setSearch(''); };
  const hasFilters   = category || status || search;

  return (
    <Box p={3}>
      <Typography variant="h5" sx={{ flexGrow: 1, textAlign: '', fontWeight: 'bold', fontFamily: 'Playfair Display', letterSpacing: 2 }}>Filter Complaints</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Showing {filtered.length} of {visible.length} complaint{visible.length !== 1 ? 's' : ''}
      </Typography>

      {/* ── Filter controls ── */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
            <TextField
              placeholder="Search title, description or location…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="small"
              sx={{ minWidth: 260 }}
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
              <Select
                value={category}
                label="Category"
                onChange={e => setCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {CATEGORIES.map(c => (
                  <MenuItem key={c} value={c}>{CAT_ICONS[c]} {c}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={e => setStatus(e.target.value)}
              >
                <MenuItem value="">All Statuses</MenuItem>
                {STATUS_LIST.map(s => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {hasFilters && (
              <Button variant="outlined" size="small" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* ── Results table ── */}
      <TableContainer component={Card}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0f4f8' }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Details</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  {hasFilters
                    ? 'No complaints match the current filters.'
                    : 'No complaints found.'}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(c => (
                <TableRow key={c.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    #{String(c.id).slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{c.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${CAT_ICONS[c.category] ?? '📋'} ${c.category}`}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{c.location || '—'}</TableCell>
                  <TableCell>{c.dateSubmitted || c.createdDate}</TableCell>
                  <TableCell>{statusChip(c.status)}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate('/details', { state: c })}
                    >
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