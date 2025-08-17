import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { checklogin } from "../Service/service";
import { styled } from "@mui/system";
import backgroundImage from "../../public/image.png";
import Navbar from "./Navbar";
import SignUp from "./SignUp";
import { useState } from "react";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backdropFilter: "blur(4px)",
  padding: "20px",
});

const LoginBox = styled("div")({
  width: "100%",
  maxWidth: "420px",
  padding: "30px",
  borderRadius: "16px",
  background: "rgba(255, 255, 255, 0.12)",
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  color: "#fff",
});

const Title = styled("h2")({
  marginBottom: "20px",
  fontFamily: "'Playfair Display', serif",
  color: "#f8b500",
  textShadow: "1px 1px 4px #000",
});

const Label = styled("label")({
  display: "block",
  marginBottom: "6px",
  fontWeight: 500,
  color: "#f8f8f8",
  marginTop: "10px",
});

const Input = styled("input")({
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.2)",
  color: "white",
  fontSize: "16px",
  transition: "0.3s ease-in-out",
  "&::placeholder": {
    color: "#ccc",
  },
  "&:focus": {
    background: "rgba(255,255,255,0.3)",
  },
});

const Error = styled("div")({
  color: "#ff5a5f",
  fontSize: "13px",
  marginBottom: "8px",
});

const ButtonGroup = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "20px",
});

const Login = () => {
  const nav = useNavigate();
  const [signUpOpen, setSignUpOpen] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!(values.useremail.includes("@") && values.useremail.includes("."))) {
      errors.useremail = "Enter a valid email";
    }
    if (!values.password) {
      errors.password = "Enter a password";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      useremail: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      checklogin(values)
        .then((res) => {
          console.log("Login API response:", res);
          console.log(res.role);
          if (res.success) {
            localStorage.setItem("message", res.message)
            localStorage.setItem("token", res.token);
            localStorage.setItem("role", res.role);
            localStorage.setItem("email", res.email);
            switch (res.role.toLowerCase()) {
              case "user":
                nav("/order/addorder");
                console.log("User Order page")
                break;
              case "manager":
                nav("/managerhome");
                break;
              case "admin":
                nav("/ownerhome");
                break;
              default:
                alert("Unknown role. Cannot redirect.");
                break;
            }
          } else {
            alert(res.message||"Login failed: No token received");
          }
        })
        .catch((error) => {
      console.error("Login error:", error);
      alert("Something went wrong while logging in. Please try again.");
    });
    },
  });

  return (
    <>
      <Navbar />
      <Container>
        <LoginBox>
          <center>
            <Title>Login</Title>
          </center>
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Label htmlFor="useremail">Email:</Label>
            <Input
              type="email"
              name="useremail"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.useremail}
            />
            {formik.touched.useremail && formik.errors.useremail && (
              <Error>{formik.errors.useremail}</Error>
            )}

            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <Error>{formik.errors.password}</Error>
            )}

            <ButtonGroup>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#f8b500",
                  color: "#fff",
                  "&:hover": { background: "#ffd700" },
                }}
              >
                LOGIN
              </Button>
              <Button
                type="reset"
                variant="contained"
                sx={{
                  background: "#ff5a5f",
                  color: "#fff",
                  "&:hover": { background: "#ff3d3f" },
                }}
              >
                RESET
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "#c81d25",
                  color: "#fff",
                  "&:hover": { background: "#a71c1c" },
                }}
                onClick={() => nav("/")}
              >
                CANCEL
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#00adb5",
                  color: "#00adb5",
                  "&:hover": { background: "#00adb5", color: "#fff" },
                }}
                onClick={() => setSignUpOpen(true)}
              >
                Don't have an account? Sign Up
              </Button>
            </ButtonGroup>
          </form>
        </LoginBox>
        <SignUp open={signUpOpen} handleClose={() => setSignUpOpen(false)} />
      </Container>
    </>
  );
};

export default Login;
