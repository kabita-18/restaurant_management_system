import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { AddManagerDetails } from "../Service/service";
import { useNavigate } from 'react-router-dom'; 

const AddManager = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    mname: '',
    email: '',
    status: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await AddManagerDetails(formData);
      setMessage('Manager added successfully!');
      setFormData({ mname: '', email: '', status: '', password: '' });
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || 'Something went wrong.'));
    }
  };

  const handleClose = () => {
    navigate('/ownerhome'); 
  };

  return (
    <Box
      sx={{
        width: '400px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" mb={3} align="center">
        Add Manager
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Manager Name"
          name="mname"
          value={formData.mname}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="Active" >Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          required
          fullWidth
          margin="normal"
        />

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>

          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </form>

      {message && (
        <Typography mt={2} color={message.includes('success') ? 'green' : 'red'} align="center">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AddManager;
