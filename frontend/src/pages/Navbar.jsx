import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", paddingX: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            letterSpacing: 2,
            color: "#f8b500",
            textShadow: "0 2px 15px rgba(0,0,0,0.6)",
            cursor: "pointer",
            fontFamily: "'Playfair Display', serif",
            transition: "color 0.3s ease, transform 0.3s ease",
            "&:hover": {
              color: "#ffd700",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => nav("/")}
        >
          DELICIOUS BYTES
        </Typography>

        <Box>
          {["Home", "Login", "Menu", "About"].map((label, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => {
                if (label.toLowerCase() === "home") {
                  nav("/");
                } else if (label.toLowerCase() === "menu") {
                  nav("/view/menu");
                } else {
                  nav(`/${label.toLowerCase()}`);
                }
              }}
              sx={{
                color: "white",
                backgroundColor: "#f8b500",
                fontWeight: "bold",
                fontSize: 16,
                marginX: 1,
                paddingX: 3,
                paddingY: 1,
                textTransform: "none",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#ffd700",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                  transform: "scale(1.05)",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
