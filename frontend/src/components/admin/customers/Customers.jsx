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

const Customers = () => {
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

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
      title: "Green Care User List",
      subject: "Detailed User Information",
      author: "Green Care",
      keywords: "users, list, green care",
      creator: "Green Care PDF Generator",
    });

    // Letterhead
    doc.setDrawColor(0, 100, 0);
    doc.setFillColor(240, 255, 240);
    doc.rect(0, 0, doc.internal.pageSize.width, 40, "F");
    doc.setFontSize(24);
    doc.setTextColor(0, 100, 0);
    doc.text("Green Care", 14, 25);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("123 Eco Street, Green City, 12345", 14, 35);

    // Title and Total Users
    doc.setFontSize(18);
    doc.setTextColor(0, 100, 0);
    doc.text("Customer List", 14, 60);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total no of Customers: ${filteredUsers.length}`, 14, 70);

    // Table
    doc.autoTable({
      head: [["Name", "Email", "Mobile Number"]],
      body: filteredUsers.map((user) => [user.name, user.email, user.phone]),
      startY: 80,
      styles: {
        fontSize: 10,
        cellPadding: 5,
        lineColor: [0, 100, 0],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [0, 100, 0],
        textColor: 255,
        fontSize: 12,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 255, 240],
      },
      didDrawPage: (data) => {
        // Letterhead on each page
        doc.setDrawColor(0, 100, 0);
        doc.setFillColor(240, 255, 240);
        doc.rect(0, 0, doc.internal.pageSize.width, 40, "F");
        doc.setFontSize(24);
        doc.setTextColor(0, 100, 0);
        doc.text("Green Care", 14, 25);

        // Add page number at the bottom
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(
          `Page ${data.pageNumber} of ${data.pageCount}`,
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 10
        );
      },
    });

    // Add generation timestamp
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      14,
      doc.internal.pageSize.height - 10
    );

    // Save the PDF
    doc.save("Green_Care_User_List.pdf");
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
