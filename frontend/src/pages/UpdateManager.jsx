import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import { UpdateManagerDetails, fetchAllManagers } from "../Service/service";

const UpdateManager = () => {
  const [managerDetails, setManagerDetails] = useState([]);
  const nav = useNavigate();

  // Fetch manager details on load
  useEffect(() => {
    const loadManagers = async () => {
      try {
        const data = await fetchAllManagers();
        setManagerDetails(data);
      } catch (error) {
        console.error("Error fetching manager details", error);
      }
    };
    loadManagers();
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      mid: "",
      mname: "",
      status: "",
    },
    onSubmit: (values) => {
      UpdateManagerDetails(values)
        .then(() => {
          alert("Manager updated successfully");
          nav("/ownerhome");
        })
        .catch((err) => console.error("Update failed", err));
    },
  });

  // Auto-populate manager name based on selected mid
  useEffect(() => {
    const selectedManager = managerDetails.find(
      (manager) => manager.mid === formik.values.mid
    );
    if (selectedManager) {
      formik.setFieldValue("mname", selectedManager.mname);
    } else {
      formik.setFieldValue("mname", "");
    }
  }, [formik.values.mid, managerDetails]);

  const handleClose = () => {
    nav("/ownerhome");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
        <Typography variant="h5" gutterBottom align="center">
          Update Manager Status
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
          
          <TextField
            fullWidth
            select
            label="Select Manager ID"
            name="mid"
            value={formik.values.mid}
            onChange={formik.handleChange}
            required
            margin="normal"
          >
            <MenuItem value="">Select</MenuItem>
            {managerDetails.map((manager) => (
              <MenuItem key={manager.mid} value={manager.mid}>
                {manager.mid}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Manager Name"
            name="mname"
            value={formik.values.mname}
            disabled
            margin="normal"
          />

          {/* Status Dropdown */}
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            required
            margin="normal"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formik.values.mid || !formik.values.status}
            >
              Update Manager
            </Button>

            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateManager;
