import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1c1c1c",
        color: "white",
        textAlign: "center",
        padding: "30px 20px",
        marginTop: "50px",
        position: "relative",
        width: "100vw",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        🍴 Delicious Bytes
      </Typography>
      <Typography variant="body2" sx={{  display: "inline", 
                       paddingTop: 0,
                       overflowWrap: "break-word",textAlign: "center", }}>
        Serving happiness with every bite | © {new Date().getFullYear()}
      </Typography>

      {/* Quick Links */}
      <Box sx={{ marginBottom: 2 }}>
        {["Home", "Menu", "About", "Contact"].map((item, idx) => (
          <Link
            key={idx}
            href={`/${item.toLowerCase()}`}
            underline="hover"
            sx={{
              color: "#f8b500",
              marginX: 2,
              fontWeight: "bold",
              "&:hover": { color: "#ffd700" },
            }}
          >
            {item}
          </Link>
        ))}
      </Box>

      {/* Social Media Icons */}
      <Box>
        <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#f8b500" }}>
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" sx={{ color: "#f8b500" }}>
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" sx={{ color: "#f8b500" }}>
          <Instagram />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
