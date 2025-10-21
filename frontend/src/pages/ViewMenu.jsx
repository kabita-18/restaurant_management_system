import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import backgroundImage from "../../public/black_hand_drawn_menu.jpg";
import "../index.css";

const ViewMenu = () => {
  const [menu, setMenu] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await Axios.get(
          "http://restaurantmanagement-env.eba-imdxzriv.eu-north-1.elasticbeanstalk.com/deliciousbyte/view/menu"
        );
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  const sortByPrice = () => {
    const sorted = [...menu].sort((a, b) => a.price - b.price);
    setMenu(sorted);
  };

  const sortByCategory = () => {
    const sorted = [...menu].sort((a, b) =>
      a.category.localeCompare(b.category)
    );
    setMenu(sorted);
  };

  const sortByStatus = () => {
    const sorted = [...menu].sort((a, b) => a.status.localeCompare(b.status));
    setMenu(sorted);
  };

  const clearSort = () => {
    window.location.reload(false);
  };

  const handleItemSearch = (e) => {
    setSearchItem(e.target.value);
  };

  const filteredMenu = searchItem
    ? menu.filter((item) =>
        item.dishname.toLowerCase().includes(searchItem.toLowerCase())
      )
    : menu;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Delicious Bytes - Menu List", 14, 15);

    const tableColumn = ["Menu ID", "Category", "Dish Name", "Price", "Status"];
    const tableRows = filteredMenu.map((item) => [
      item.menuid,
      item.category,
      item.dishname,
      `₹${item.price}`,
      item.status,
    ]);

    autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 25,
  });

    doc.save("DeliciousBytes_Menu.pdf");
  };

  return (
    <div
      className="view-menu-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        height: "100vh",
        overflow: "hidden",
        padding: "20px",
        color: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>VIEW MENU</h2>

      <div
        className="menu-controls"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={sortByPrice}
          style={{ backgroundColor: "#ff9800" }}
        >
          Sort by Price
        </Button>
        <Button
          variant="contained"
          onClick={sortByCategory}
          style={{ backgroundColor: "#4caf50" }}
        >
          Sort by Category
        </Button>
        <Button
          variant="contained"
          onClick={sortByStatus}
          style={{ backgroundColor: "#2196f3" }}
        >
          Sort by Status
        </Button>
        <input
          type="text"
          placeholder="Search Dish"
          value={searchItem}
          onChange={handleItemSearch}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minWidth: "200px",
            color: "black",
          }}
        />
        <Button
          variant="contained"
          onClick={clearSort}
          style={{ backgroundColor: "#e91e63" }}
        >
          Clear Sort
        </Button>
        <Button
          variant="contained"
          onClick={generatePDF}
          style={{ backgroundColor: "#6a1b9a" }}
        >
          Generate PDF
        </Button>
      </div>

      {/* Table */}
      <div
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
          borderRadius: "8px",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <table
          className="menu-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead
            style={{ position: "sticky", top: 0, backgroundColor: "#333" }}
          >
            <tr>
              <th style={{ padding: "12px", fontWeight: "600" }}>Menu ID</th>
              <th style={{ padding: "12px", fontWeight: "600" }}>Category</th>
              <th style={{ padding: "12px", fontWeight: "600" }}>Dish Name</th>
              <th style={{ padding: "12px", fontWeight: "600" }}>Price</th>
              <th style={{ padding: "12px", fontWeight: "600" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenu.map((dish) => (
              <tr key={dish.menuid}>
                <td style={{ padding: "10px" }}>{dish.menuid}</td>
                <td style={{ padding: "10px" }}>{dish.category}</td>
                <td style={{ padding: "10px" }}>{dish.dishname}</td>
                <td style={{ padding: "10px" }}>₹{dish.price}</td>
                <td
                  style={{
                    padding: "10px",
                    color:
                      dish.status === "available" ? "#4caf50" : "#f44336",
                  }}
                >
                  {dish.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMenu;
