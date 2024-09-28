/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  IconButton,
  Badge,
} from "@mui/material";
import { Search, GetApp, Refresh, Group } from "@mui/icons-material";

const Customers = ({ onTotalUsersChange }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/users",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      onTotalUsersChange(response.data.users.length);
      console.log(response.data.users.length); // Call the callback with the total users
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred while fetching users."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const generatePDF = async () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set document properties for professionalism
    doc.setProperties({
      title: "Green Care Customer List",
      subject: "Detailed Customer Information",
      author: "Green Care",
      keywords: "customers, list, green care",
      creator: "Green Care PDF Generator",
    });

    // Color scheme for polished design
    const primaryColor = [39, 174, 96]; // Green for main elements
    const secondaryColor = [241, 196, 15]; // Yellow for accents
    const textColor = [44, 62, 80]; // Dark for readable text
    const lightGray = [241, 241, 241]; // Gray for alternating rows

    // Page dimensions for consistent layout
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 14;

    // Header with company name and slogan
    const drawHeader = () => {
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, pageWidth, 40, "F");

      doc.setFont("Poppins", "bold");
      doc.setFontSize(24);
      doc.setTextColor(255, 255, 255);
      doc.text("Green Care", margin, 25); // Left-aligned

      doc.setFont("Poppins", "normal");
      doc.setFontSize(10);
      doc.text("Sustainable Solutions for a Better Tomorrow", margin, 35); // Left-aligned
    };

    // Footer with date on the left and page number on the right
    const drawFooter = (pageNumber, pageCount) => {
      doc.setFillColor(...lightGray);
      doc.rect(0, pageHeight - 20, pageWidth, 20, "F");

      doc.setFont("Poppins", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...textColor);

      // Date on the left
      doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        margin,
        pageHeight - 10
      );

      // Page number on the right
      doc.text(
        `Page ${pageNumber} of ${pageCount}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: "right" }
      );
    };

    // Title and Total Customers, left-aligned
    drawHeader();

    doc.setFont("Poppins", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...textColor);
    doc.text("Customer List", margin, 60); // Left-aligned

    doc.setFont("Poppins", "normal");
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text(`Total Customers: ${filteredUsers.length}`, margin, 70); // Left-aligned

    // Decorative line for separation
    doc.setDrawColor(...secondaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, 75, pageWidth - margin, 75);

    // Customer data table
    doc.autoTable({
      head: [["Name", "Email", "Mobile Number"]],
      body: filteredUsers.map((user) => [user.name, user.email, user.phone]),
      startY: 85,
      styles: {
        font: "Poppins",
        fontSize: 10,
        cellPadding: 6,
        lineColor: [189, 195, 199],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontSize: 12,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: lightGray, // Alternating row colors for clarity
      },
      margin: { top: 80, right: margin, bottom: 40, left: margin },
      didDrawPage: (data) => {
        drawHeader();
        drawFooter(data.pageNumber, data.pageCount);
      },
    });

    // Save the PDF with a clear name
    doc.save("Green_Care_Customer_List.pdf");
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  return (
    <>
      <Card
        style={{
          margin: "1rem",
          padding: "2rem",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <CardHeader
          title="User Management Dashboard"
          action={
            <IconButton
              color="primary"
              onClick={fetchUsers}
              title="Refresh Users"
            >
              <Refresh />
            </IconButton>
          }
          style={{ textAlign: "center", color: "#3f51b5" }}
        />
        <CardContent>
          <Grid
            container
            spacing={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <Search style={{ color: "gray", marginRight: "0.5rem" }} />
                  ),
                }}
                variant="outlined"
                style={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
              <Badge
                badgeContent={filteredUsers.length}
                color="secondary"
                showZero
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                style={{ marginRight: "1rem" }}
              >
                <Group color="action" fontSize="large" />
              </Badge>
              <Button
                variant="contained"
                color="primary"
                onClick={generatePDF}
                startIcon={<GetApp />}
              >
                Download PDF
              </Button>
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              textAlign: "center",
              color: "#333",
            }}
          >
            Total Users: {users.length}
          </Typography>
          <TableContainer
            component={Paper}
            style={{
              boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead style={{ backgroundColor: "#3f51b5", color: "#fff" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                    Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                    Email
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                    Mobile Number
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      hover
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || "N/A"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default Customers;
