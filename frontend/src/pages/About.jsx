import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from './Navbar';

const About = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url('/about.png')",
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
        
      }}
    >
      <Navbar/>
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#f8b500', mb: 2 , padding: 4}}>
        About Us
      </Typography>
      
      <Typography
       
        sx={{ fontSize: 18, color: '#ffffff', maxWidth: 900, marginBottom: 4, textAlign: 'center', padding: 10}}
      >
        Our Chef uses locally grown produce, beef, and poultry. Our Pastry Chef prepares daily delicious desserts.
        Our bar offers an array of wines, cocktails, beers, and liqueurs. Try our traditional Turkish coffee with your
        dessert. Enjoy our freshly prepared meals in a cozy and relaxing atmosphere with your friends and family.
        Celebrate your special occasions with us, and we will make your meal a memorable one.
      </Typography>

      <img
        
        alt="About Us"
        style={{ width: "60%", borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}
      />
    </Box>
  );
};

export default About;
