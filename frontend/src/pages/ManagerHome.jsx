import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ManagerHome = () => {
  const nav = useNavigate();
  const [isDropdown1Visible, setDropdown1Visibility] = useState(false);
  const [isDropdown2Visible, setDropdown2Visibility] = useState(false);

  const toggleDropdown1 = () => {
    setDropdown1Visibility(!isDropdown1Visible);
    setDropdown2Visibility(false);
  };
  const toggleDropdown2 = () => {
    setDropdown2Visibility(!isDropdown2Visible);
    setDropdown1Visibility(false);
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f4f6f8" overflow="hidden">
      {/* Sidebar */}
      <Box
        width="250px"
        bgcolor="#2c3e50"
        color="white"
        p={2}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h5" gutterBottom>
          Delicious Bytes
        </Typography>
        <Button
          variant="contained"
          sx={{ my: 1, bgcolor: "#34495e" }}
          onClick={() => nav("/updatepassword")}
        >
          Change Password
        </Button>

        <Divider sx={{ my: 2, bgcolor: "#7f8c8d" }} />

        <Box>
          <Button
            fullWidth
            onClick={toggleDropdown1}
            sx={{ justifyContent: "space-between", color: "white" }}
          >
            Item <ArrowDropDownIcon />
          </Button>
          {isDropdown1Visible && (
            <Box ml={2}>
              <Button onClick={() => nav("/updatemenumanag")} sx={{ color: "white" }}>
                Update
              </Button>
            </Box>
          )}
        </Box>

        <Box>
          <Button
            fullWidth
            onClick={toggleDropdown2}
            sx={{ justifyContent: "space-between", color: "white" }}
          >
            Orders <ArrowDropDownIcon />
          </Button>
          {isDropdown2Visible && (
            <Box ml={2}>
              <Button onClick={() => nav("/vieworders")} sx={{ color: "white" }}>
                View Orders
              </Button>
              <Button onClick={() => nav("/submitorder")} sx={{ color: "white" }}>
                New Order
              </Button>
            </Box>
          )}
        </Box>

        <Button sx={{ color: "white", mt: 2 }} onClick={() => nav("/viewmenu")}>
          View Menu
        </Button>
        <Button sx={{ color: "white", mt: "auto" }} onClick={() => nav("/")}>
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={3} overflow="auto">
        <Typography variant="h4" gutterBottom>
          Welcome, Manager
        </Typography>

        {/* Dashboard Section */}
        <Grid container spacing={3}>
          {/* Notifications */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Notifications</Typography>
                <ul>
                  <li>New order placed</li>
                  <li>Menu item updated</li>
                  <li>Low stock: Pizza Base</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          {/* Popular Items */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Popular Items</Typography>
                <ul>
                  <li>Paneer Pizza</li>
                  <li>Veg Burger</li>
                  <li>Chocolate Shake</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Quick Actions</Typography>
                <Button fullWidth sx={{ my: 1 }} variant="outlined" onClick={() => nav("/submitorder")}>
                  Create New Order
                </Button>
                <Button fullWidth sx={{ my: 1 }} variant="outlined" onClick={() => nav("/updatemenumanag")}>
                  Update Menu
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue Summary */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Revenue</Typography>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  ₹1,25,000
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This month's total revenue
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Orders Summary */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4" color="secondary" fontWeight="bold">
                  324
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Orders completed this month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Generate Report Section */}
        <Box mt={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Generate Report</Typography>
            <Typography variant="body2" color="text.secondary">
              Download detailed sales and inventory report for auditing.
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Generate PDF
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ManagerHome;
