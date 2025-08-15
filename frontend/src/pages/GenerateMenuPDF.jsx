
import React, { useEffect, useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Axios from 'axios';

const DownloadMenuPDF = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await Axios.get('http://localhost:9090/deliciousbyte/view/menu');
        setMenu(response.data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };

    fetchMenu();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Delicious Bytes - Menu List', 14, 15);

    const tableColumn = ['Menu ID', 'Category', 'Dish Name', 'Price', 'Status'];
    const tableRows = [];

    menu.forEach(item => {
      const row = [
        item.menuid,
        item.category,
        item.dishname,
        `₹${item.price}`,
        item.status
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    doc.save('DeliciousBytes_Menu.pdf');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Download Menu as PDF
      </Typography>
      <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
        Download PDF
      </Button>
    </Box>
  );
};

export default DownloadMenuPDF;
