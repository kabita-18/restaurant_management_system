import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { UpdateMenuItemsOwners } from "../Service/service";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";

// ✅ Styled components (same design as Additems)
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
    colorClass === "update"
      ? "linear-gradient(45deg, #4caf50, #81c784)"
      : colorClass === "back"
      ? "linear-gradient(45deg, #ffcc95, #ff9f40)"
      : "linear-gradient(45deg, #ffcc95, #ffaf60)",
  "&:hover": {
    boxShadow:
      colorClass === "update"
        ? "0 0 15px 5px #4caf50"
        : colorClass === "back"
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
  if (!values.category) errors.category = "Select a category";
  if (!values.dishname) errors.dishname = "Select a dish";
  if (!values.price) errors.price = "Enter price";
  else if (isNaN(values.price)) errors.price = "Price must be a number";
  if (!values.status) errors.status = "Select status";
  return errors;
};

const UpdateMenuOwner = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:9090/deliciousbyte/view/menu")
      .then((res) => {
        setMenu(res.data);
        const uniqueCategories = [
          ...new Set(res.data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const formik = useFormik({
    initialValues: {
      dishname: "",
      category: "",
      price: "",
      status: "",
    },
    validate,
    onSubmit: (values) => {
      UpdateMenuItemsOwners(values)
        .then(() => {
          alert("Menu updated successfully ✅");
          navigate("/ownerhome");
        })
        .catch((error) => {
          console.error("Update error:", error);
          alert("Failed to update ❌");
        });
    },
  });

  const getDishesByCategory = () =>
    menu.filter((item) => item.category === formik.values.category);

  const selectedDish = menu.find(
    (item) => item.dishname === formik.values.dishname
  );

  return (
    <Container style={{ backgroundImage: `url('/view1.jpg')` }}>
      <Box>
        <center>
          <Title>Update Menu Item</Title>
        </center>
        <Divider sx={{ mb: 2 }} />

        <form onSubmit={formik.handleSubmit}>
          {/* Category */}
          <Label>Select Category:</Label>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <Error>{formik.errors.category}</Error>
          )}

          {/* Dish */}
          <Label>Select Dish:</Label>
          <select
            name="dishname"
            value={formik.values.dishname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            {getDishesByCategory().map((item, index) => (
              <option key={index} value={item.dishname}>
                {item.dishname}
              </option>
            ))}
          </select>
          {formik.touched.dishname && formik.errors.dishname && (
            <Error>{formik.errors.dishname}</Error>
          )}

          {/* Old Price */}
          {selectedDish && (
            <div style={{ marginTop: "0px", paddingTop: "0px" }}>
              <Label style={{ marginTop: "0px", paddingTop: "0px" }}>
                Current Price (₹):
              </Label>
              <Input
                type="number"
                name="currentPrice"
                value={selectedDish.price}
                disabled
                style={{
                  width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ffcc95",
                    background: "rgba(240,240,240,0.9)", // light grey for disabled look
                    color: "#5d4037",
                    cursor: "not-allowed", 
                }}
              />
            </div>
          )}

       
          <Label>New Price (₹):</Label>
          <Input
            type="number"
            name="price"
            placeholder="Enter new price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #ffcc95",
              background: "rgba(255, 245, 220, 0.9)",
              color: "#5d4037",
            }}
          />
          {formik.touched.price && formik.errors.price && (
            <Error>{formik.errors.price}</Error>
          )}

          {/* Status */}
          <Label>Status:</Label>
          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
               width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #ffcc95",
                background: "rgba(255, 245, 220, 0.9)", // matches theme
                color: "#5d4037",
            }}
          >
            <option value="">Select</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <Error>{formik.errors.status}</Error>
          )}

          {/* Buttons */}
          <ButtonGroup>
            <StyledButton colorClass="update" type="submit">
              Update
            </StyledButton>
            <StyledButton
            colorClass="back"
            onClick={() => {
              const role = localStorage.getItem("role"); 
              if (role === "ADMIN") {
                navigate("/ownerhome");
              } else if (role === "MANAGER") {
                navigate("/managerhome");
              } else {
                navigate("/"); // fallback
              }
            }}
          >
            Back
          </StyledButton>
          </ButtonGroup>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateMenuOwner;
