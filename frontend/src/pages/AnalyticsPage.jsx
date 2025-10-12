import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllOrders } from "../Service/service";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsPage = () => {
  const [chartData, setChartData] = useState([]);
  const [filterType, setFilterType] = useState("month"); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();

        
        const grouped = {};
        data.forEach((order) => {
          const date = new Date(order.createdAt); 
          let key = "";

          if (filterType === "day") {
            key = date.toLocaleDateString();
          } else if (filterType === "month") {
            key = `${date.getMonth() + 1}-${date.getFullYear()}`;
          } else if (filterType === "year") {
            key = `${date.getFullYear()}`;
          }

          grouped[key] = (grouped[key] || 0) + (order.tprice || 0);
        });

        const formattedData = Object.entries(grouped).map(([name, value]) => ({
          name,
          value,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [filterType]);

  return (
    <Box p={3} bgcolor="#f4f6f8" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Sales Analytics
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6">Sales Distribution</Typography>

        {/* Filter Buttons */}
        <Box display="flex" gap={2} mt={2}>
          <Button
            variant={filterType === "day" ? "contained" : "outlined"}
            onClick={() => setFilterType("day")}
          >
            Days
          </Button>
          <Button
            variant={filterType === "month" ? "contained" : "outlined"}
            onClick={() => setFilterType("month")}
          >
            Months
          </Button>
          <Button
            variant={filterType === "year" ? "contained" : "outlined"}
            onClick={() => setFilterType("year")}
          >
            Years
          </Button>
        </Box>

        {/* Pie Chart */}
        <Box height={400} mt={3}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default AnalyticsPage;
