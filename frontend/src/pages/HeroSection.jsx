import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "static",
        height: "100vh", 
        // width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover", 
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      >
        <source src="/videos/food2.mp4" type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)", 
          zIndex: 0,
        }}
      />

      {/* Hero Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#fff",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Delicious Food, Anytime
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Order your favorite meals with just one click
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ px: 4, py: 1.5, fontSize: "1rem", borderRadius: "25px" }}
          onClick={() => navigate("/view/menu")}
        >
          Explore Menu
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
