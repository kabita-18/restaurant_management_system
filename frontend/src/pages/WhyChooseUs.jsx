import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Fresh Ingredients",
      desc: "We use farm-fresh produce daily for the healthiest and tastiest meals.",
      img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Fast Delivery",
      desc: "Hot meals delivered at lightning speed, right to your doorstep.",
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Cozy Ambience",
      desc: "Perfect dining experience with warm lights and comfort seating.",
      img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Online Ordering",
      desc: "Order anytime from our website or app with just a few clicks.",
      img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fffaf0, #f8f9fa)",
        py: 8,
      }}
    >
      <Container>
        {/* Heading */}
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: "bold", mb: 6, color: "#333" }}
        >
          Why Choose Us
        </Typography>

        {/* Cards */}
        <Grid container spacing={4}>
          {features.map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{ height: "100%" }}
              >
                <Card
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {/* Card Image */}
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />

                  {/* Card Content */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      textAlign: "center",
                      p: 2, 
                      "&:last-child": { pb: 2 }, 
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 1, color: "#e63946" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"  
                      sx={{
                        lineHeight: 1.2,           
                        fontSize: "0.9rem", 
                        paddingTop: 0,
                        overflowWrap: "break-word",
                        display: "inline", 
                        whiteSpace: "normal", 

                    }}
                    >
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
