import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container, Box, AppBar, Toolbar, Button} from "@mui/material";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";


const Home = () => {
  const nav = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url('/Homepage.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: "white",
        overflow: "hidden",
      }}
    >
     <Navbar/>
      <Container sx={{ textAlign: "center", zIndex: 1 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4 }}>
          Discover a New World of Taste
        </Typography>
        <Typography
          variant="h6"
          sx={{ maxWidth: 800, margin: "auto", lineHeight: 1.6 }}
        >
          Every trip is a new story and discovery: a meal you've never tasted
          before, a tempting smell of roasted coffee, or freshly baked cookies.
          Eat whatever and whenever you want! Our restaurant and bar are open
          from early morning to late night, serving delicious meals and
          beverages. From tasty and delicious Turkish cuisine to international
          flavors. Bon appetit!
        </Typography>
      </Container>
      
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      />
    </Box>
    
  );
};

export default Home;
