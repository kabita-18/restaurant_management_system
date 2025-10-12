import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Navbar from "./Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Component/Footer";
import HeroSection from "./HeroSection";
import SpecialsPage from "./SpecialsPage";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";

const Home = () => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveUsers((prev) => prev + Math.floor(Math.random() * 3));
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        // background: "linear-gradient(135deg, #ff9a9e 0%, #ff6a00 100%)"
      }}
    >
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
          color: "white",
        }}
      />

      {/* Hero Section */}
      <Container>
        <HeroSection />
      </Container>

      {/* Specials Section */}
      <Container>
        <SpecialsPage />
      </Container>

      {/* Why Choose Us */}
      <Container>
        <WhyChooseUs />
      </Container>

      {/* Testimonials */}
      <Container>
        <Testimonials />
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
