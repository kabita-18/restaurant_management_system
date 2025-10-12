import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import dish1 from "../assets/Burger.jpg";
import dish2 from "../assets/dish2.png";
import dish3 from "../assets/dish3.png";

const specials = [
  { name: "Burger", img: dish1 },
  { name: "Pasta Alfredo", img: dish2 },
  { name: "Sushi Platter", img: dish3 },
];

// Custom Arrows
const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: "20px",
      transform: "translateY(-50%)",
      zIndex: 2,
      background: "rgba(255,255,255,0.8)",
      "&:hover": { background: "white" },
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      zIndex: 2,
      background: "rgba(255,255,255,0.8)",
      "&:hover": { background: "white" },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1, 
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

const SpecialsPage = () => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden", py: 6, bgcolor: "#fafafa", }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "black" }}
      >
        Today’s Specials
      </Typography>

      <Box sx={{ width: "100%", position: "relative", height:"100%" }}>
        <Slider {...sliderSettings}>
          {specials.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "550px",
                  overflow: "hidden",
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  background: "#fff",
                  textAlign: "center",
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "450px",
                    objectFit: "cover",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    py: 2,
                    fontWeight: "bold",
                    background: "#fff",
                    color: "black",
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default SpecialsPage;
