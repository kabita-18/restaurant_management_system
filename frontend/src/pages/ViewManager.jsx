import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { fetchAllManagers } from '../Service/service';
import { useNavigate } from 'react-router-dom'; // 🔁 Import useNavigate

const ViewManager = () => {
  const [managers, setManagers] = useState([]);
  const [originalManagers, setOriginalManagers] = useState([]);
  const [searchManager, setSearchManager] = useState('');

  const navigate = useNavigate(); // 🔁 Initialize navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllManagers();
        setManagers(data);
        setOriginalManagers(data);
      } catch (error) {
        console.error('Error fetching manager data:', error);
      }
    };

    fetchData();
  }, []);

  const sortByAvailability = () => {
    const sorted = [...managers].sort((a, b) => a.status.localeCompare(b.status));
    setManagers(sorted);
  };

  const clearSort = () => {
    setManagers(originalManagers);
    setSearchManager('');
  };

  const handleClose = () => {
    navigate("/ownerhome"); 
  };

  const filteredManagers = managers.filter((manager) =>
    manager.mname.toLowerCase().includes(searchManager.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5" textAlign="center" mb={3}>
        View All Managers
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center" mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search Manager"
            variant="outlined"
            value={searchManager}
            onChange={(e) => setSearchManager(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={sortByAvailability}>
            Sort by Availability
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={clearSort}>
            Clear Sort
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="error" onClick={handleClose}>
            Close
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Manager ID</strong></TableCell>
              <TableCell><strong>Manager Name</strong></TableCell>
              <TableCell><strong>Manager Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredManagers.map((manager, index) => (
              <TableRow
                key={manager.mid}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff',
                }}
              >
                <TableCell>{manager.mid}</TableCell>
                <TableCell>{manager.mname}</TableCell>
                <TableCell>{manager.email || <i>Not Available</i>}</TableCell>
                <TableCell sx={{ color: manager.status === 'Active' ? 'green' : 'red' }}>
                  {manager.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewManager;
