import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  styled,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { registerUsers } from "../Service/service";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    padding: theme.spacing(3),
    color: "#fff",
    maxWidth: 400,
  },
}));

const TitleWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
});

const TitleText = styled("h2")({
  margin: 0,
  fontFamily: "'Playfair Display', serif",
  color: "#f8b500",
  textShadow: "1px 1px 4px #000",
  fontSize: "1.8rem",
});

const StyledTextField = styled(TextField)({
  "& label": {
    color: "#ccc",
  },
  "& label.Mui-focused": {
    color: "#f8b500",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& .MuiSelect-icon": {
    color: "#f8b500",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.3)",
      borderRadius: 8,
    },
    "&:hover fieldset": {
      borderColor: "#f8b500",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f8b500",
    },
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
const StyledMenuItem = styled(MenuItem)({
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  "&:hover": {
    backgroundColor: "#f8b500",
    color: "#000",
  },
});
const SignUp = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
    role: "", 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.repeatpassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await registerUsers(formData);
    console.log(response);
    alert("User registered!");
    handleClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <TitleWrapper>
        <TitleText>Sign Up</TitleText>
        <IconButton
          onClick={handleClose}
          sx={{ color: "#f8b500" }}
          aria-label="close"
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </TitleWrapper>

      <DialogContent dividers>
        <form>
          <StyledTextField
            fullWidth
            margin="normal"
            label="Name"
            name="username"
            variant="outlined"
            placeholder="Enter your full name"
            onChange={handleChange}
          />
          <StyledTextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            placeholder="Enter your email address"
            onChange={handleChange}
          />
          <StyledTextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            placeholder="Enter password"
            onChange={handleChange}
          />
          <StyledTextField
            fullWidth
            margin="normal"
            label="Repeat Password"
            name="repeatpassword"
            type="password"
            variant="outlined"
            placeholder="Repeat password"
            onChange={handleChange}
          />
          <StyledTextField
            select
            fullWidth
            margin="normal"
            label="Role"
            name="role"
            variant="outlined"
            value={formData.role}
            onChange={handleChange}
          >
            <StyledMenuItem value="ADMIN">Admin</StyledMenuItem>
            <StyledMenuItem value="MANAGER">Manager</StyledMenuItem>
            <StyledMenuItem value="USER">User</StyledMenuItem>
          </StyledTextField>
        </form>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
        <Button
          variant="contained"
          sx={{
            background: "#f8b500",
            color: "#fff",
            borderRadius: "12px",
            padding: "10px 40px",
            fontWeight: "bold",
            "&:hover": {
              background: "#ffd700",
            },
          }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default SignUp;
