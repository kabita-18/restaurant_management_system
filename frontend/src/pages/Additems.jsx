import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AddMenuItems } from "../Service/service";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";


const Container = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "20px",
  paddingLeft: "100px",
});


const Box = styled("div")({
  width: "100%",
  maxWidth: "420px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255, 245, 220, 0.9)",
  boxShadow: "0 10px 30px 5px rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(15px)",
  border: "1px solid #ffcc95",
  color: "#5d4037",
});


const Title = styled("h2")({
  marginBottom: "20px",
  color: "#ff9f40",
  textShadow: "1px 1px 4px #fff",
});

const Label = styled("label")({
  display: "block",
  marginBottom: "6px",
  fontWeight: 500,
  color: "#5d4037",
  marginTop: "10px",
});

const Error = styled("div")({
  color: "#ff5a5f",
  fontSize: "13px",
  marginBottom: "8px",
});


const Input = styled("input")({
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid #ffcc95",
  outline: "none",
  background: "rgba(255, 245, 220, 0.9)",
  color: "#5d4037",
  fontSize: "16px",
  transition: "all 0.3s ease",
  "&::placeholder": { color: "#ff9f40" },
  "&:focus": {
    background: "rgba(255, 235, 200, 0.9)",
    boxShadow: "0 0 10px 2px #ff9f40",
  },
});

const StyledButton = styled(Button)(({ colorClass }) => ({
  color: colorClass === "cancel" ? "#5d4037" : "#fff",
  fontWeight: "bold",
  textTransform: "uppercase",
  padding: "10px 20px",
  borderRadius: "10px",
  transition: "all 0.3s ease",
  background:
    colorClass === "add"
      ? "linear-gradient(45deg, #ff9f40, #ffcc95)"
      : colorClass === "reset"
      ? "linear-gradient(45deg, #ffcc95, #ff9f40)"
      : "linear-gradient(45deg, #ffcc95, #ffaf60)",
  "&:hover": {
    boxShadow:
      colorClass === "add"
        ? "0 0 15px 5px #ff9f40"
        : colorClass === "reset"
        ? "0 0 15px 5px #ffcc95"
        : "0 0 15px 5px #ffaf60",
  },
}));

const ButtonGroup = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "20px",
});

const validate = (values) => {
  const errors = {};
  if (!values.category) errors.category = "Please select a category.";
  if (!values.dishname) errors.dishname = "Please enter a dish name.";
  if (!values.price) errors.price = "Please enter a price.";
  if (!values.status) errors.status = "Please select availability.";
  return errors;
};


const Additems = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      category: "",
      dishname: "",
      price: "",
      status: "",
    },
    validate,
    onSubmit: (values) => {
      AddMenuItems(values)
        .then(() => {
          console.log("Menu item added successfully.");
          alert("Menu item added successfully.");
          navigate("/ownerhome");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to add menu.");
        });
    },
  });

  return (
    <Container style={{ backgroundImage: `url('/view1.jpg')` }}>
      <Box>
        <center>
          <Title>Add New Menu Item</Title>
        </center>

        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        
          <Label htmlFor="category">Category:</Label>
          <select
            id="category"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #ffcc95",
              background: "rgba(255, 245, 220, 0.9)",
              color: "#5d4037",
            }}
          >
            <option value="">Select</option>
            <option value="Continental">Continental</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <Error>{formik.errors.category}</Error>
          )}

         
          <Label htmlFor="dishname">Dish Name:</Label>
          <Input
            id="dishname"
            name="dishname"
            placeholder="Enter dish name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dishname}
          />
          {formik.touched.dishname && formik.errors.dishname && (
            <Error>{formik.errors.dishname}</Error>
          )}

         
          <Label htmlFor="price">Price (₹):</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price && (
            <Error>{formik.errors.price}</Error>
          )}

       
          <Label htmlFor="status">Availability:</Label>
          <select
            id="status"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #ffcc95",
              background: "rgba(255, 245, 220, 0.9)",
              color: "#5d4037",
            }}
          >
            <option value="">Select</option>
            <option value="available">Available</option>
            <option value="unavailable">Not Available</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <Error>{formik.errors.status}</Error>
          )}

       
          <ButtonGroup>
            <StyledButton colorClass="add" type="submit">
              Add Menu Item
            </StyledButton>
            <StyledButton colorClass="reset" type="reset">
              Reset
            </StyledButton>
            <StyledButton colorClass="cancel" onClick={() => navigate("/ownerhome")}>
              Cancel
            </StyledButton>
          </ButtonGroup>
        </form>
      </Box>
    </Container>
  );
};

export default Additems;
