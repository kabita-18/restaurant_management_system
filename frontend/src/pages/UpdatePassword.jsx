import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container
} from '@mui/material';
import { updatePassword } from '../Service/service';
import { jwtDecode } from 'jwt-decode';


const UpdatePassword = () => {
  const nav = useNavigate();

  const getUserRoleOrEmail = () => {
    const token = localStorage.getItem("token"); 
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.role;
    }
    return null;
  }
  const validate = (values) => {
    const errors = {};
    if (!values.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!values.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (values.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validate,
    onSubmit: (values) => {
      const payload = {              
        currentPassword: values.currentPassword,
        newPassword: values.newPassword 
      };

      updatePassword(payload)
        .then((res) => {
          alert('Password updated successfully!');
           const user = getUserRoleOrEmail();
          if (user === "MANAGER") {
            nav('/managerhome');
          } else if (user === "ADMIN") {
            nav('/ownerhome');
          } else {
            nav('/login');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Error updating password');
        });
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h5" align="center" gutterBottom>
            Change Password
          </Typography>

          <TextField
            fullWidth
            label="Current Password"
            name="currentPassword"
            type="password"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
            margin="normal"
          />

          <TextField
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            margin="normal"
          />

          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="primary" type="submit">
              Update Password
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdatePassword;
