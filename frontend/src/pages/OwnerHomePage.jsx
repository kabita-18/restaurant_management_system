import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { getAllOrders } from "../Service/service";

const drawerWidth = 240;

const Dropdown = ({ title, items }) => {
const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem onClick={() => setOpen(!open)}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item, index) => (
            <ListItem
              key={index}
              component={Link}
              to={item.path}
              sx={{ pl: 4 }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const OwnerHome = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [menu, setMenu] = useState([]);
  const [counts, setCounts] = useState({ total: 0, available: 0, unavailable: 0 });
  const [totalOrders, setTotalOrders] = useState(0);  

  useEffect(() => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (email && role) {
      setProfile({ email, role });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
  const fetchMenuData = async () => {
    try {
      const res = await fetch('http://restaurantmanagement-env.eba-imdxzriv.eu-north-1.elasticbeanstalk.com/deliciousbyte/view/menu');
      const data = await res.json();
      setMenu(data);

      const total = data.length;
      const available = data.filter(item => item.status === "available").length;
      const unavailable = data.filter(item => item.status === "unavailable").length;
      setCounts({ total, available, unavailable });
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  fetchMenuData();
}, []);

 useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setTotalOrders(data.length); 
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);


if (!profile) return <div>Loading your profile...</div>;

  

  const menuItems = [
    { label: "ADD", path: "/add" },
    { label: "UPDATE", path: "/updatemenuowner" },
  ];

  const managerItems = [
    { label: "ADD MANAGER", path: "/addmanager" },
    { label: "UPDATE MANAGER", path: "/updatemanager" },
    { label: "VIEW MANAGER", path: "/viewmanager" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" align="center">
            DELICIOUS BYTES
          </Typography>
          <Button
                variant="contained"
                sx={{ my: 1, bgcolor: "#34495e" }}
                onClick={() => navigate("/updatepassword")}
              >
                Change Password
              </Button>
        </Box>
        <Divider />
        <List>
          <Dropdown title="ITEM" items={menuItems} />
          <Dropdown title="MANAGER" items={managerItems} />
          <ListItem component={Link} to="/view/menu">
            <ListItemText primary="VIEW MENU" />
          </ListItem>
          <ListItem component={Link} to="/view/orders">
            <ListItemText primary="VIEW ORDERS" />
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemText primary="LOGOUT" sx={{ color: "red" }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#fff", p: 3, overflowY: "auto" }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome, {profile.email}
        </Typography>
        <Typography variant="subtitle1">Role: {profile.role}</Typography>
        <Box
          sx={{
            mt: 4,
            display: "grid",
            gap: 3,
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          <Box sx={{ p: 3, bgcolor: "#e3f2fd", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Total Dishes
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {counts.total}
            </Typography>
          </Box>

          <Box sx={{ p: 3, bgcolor: "#f3e5f5", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Available Items
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {counts.available}
            </Typography>
          </Box>

          <Box sx={{ p: 3, bgcolor: "#ffe0b2", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Unavailable Items
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {counts.unavailable}
            </Typography>
          </Box>

           <Box sx={{ p: 3, bgcolor: "#c8e6c9", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Total Orders
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalOrders}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Recent Updates
          </Typography>
          <ul>
            <li>
              <strong>Paneer Butter Masala</strong> marked as{" "}
              <em>Unavailable</em>
            </li>
            <li>
              <strong>Chicken Biryani</strong> updated price to ₹220
            </li>
            <li>
              <strong>Added new manager:</strong> rajesh@byte.com
            </li>
          </ul>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/add")}
            >
              Add Item
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/view/menu")}
            >
              View Menu
            </Button>
            <Button variant="contained" onClick={() => navigate("/addmanager")}>
              Add Manager
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 4}}>
          <Typography variant="contained" color={"black"}>
            Use the sidebar to manage items, managers, or view the full menu.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OwnerHome;
