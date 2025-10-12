import React from "react";
import { Box, Typography, Card, CardContent, Avatar, Divider } from "@mui/material";
import Slider from "react-slick";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Alice Johnson",
    feedback: "The service was outstanding! I’ll definitely order again.",
  },
  {
    name: "Robert Smith",
    feedback: "Quick delivery and delicious food. Highly recommend!",
  },
  {
    name: "Sophia Williams",
    feedback: "Amazing experience! Everything was fresh and on time.",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,
};

const Testimonials = () => {
  return (
    
    <Box sx={{ py: 6, px: 2, textAlign: "center", color:"black"}}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        What Our Customers Say
      </Typography>

      <Slider {...sliderSettings}>
        {testimonials.map((t, idx) => (
          <Box key={idx}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  p: 4,
                  borderRadius: "16px",
                  maxWidth: 600,
                  mx: "auto",
                  boxShadow: 5,
                }}
              >
                <CardContent>
                  <Avatar sx={{ bgcolor: "secondary.main", mx: "auto", mb: 2 }}>
                    {t.name[0]}
                  </Avatar>
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{
                      fontStyle: "italic",
                      textAlign: "center",
                      whiteSpace: "normal",
                      wordBreak: "normal",
                      color:"black",
                      display: "inline", 
                       paddingTop: 0,
                       overflowWrap: "break-word",
                    }}
                  >
                    {t.feedback}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant="subtitle2"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    - {t.name}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Testimonials;
