import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { FaFilter } from "react-icons/fa";

const Filter_Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const result = await response.json();
        setData(result.users);
        setFilteredData(result.users);
        setCities([...new Set(result.users.map((user) => user.address.city))]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    setFilteredData(
      data.filter(
        (user) =>
          (selectedGender === "all" || user.gender === selectedGender) &&
          (selectedCity === "all" || user.address.city === selectedCity)
      )
    );
  }, [selectedGender, selectedCity, data]);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <Box className="App" p={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <h2 style={{ marginLeft: "10px" }}>Employees</h2>
          <Box display="flex" alignItems="center" gap="20px">
            <FaFilter style={{ fontSize: "20px", color: "brown" }} />
            <FormControl style={{ minWidth: 120, fontSize: "0.875rem" }}>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                value={selectedGender}
                onChange={handleGenderChange}
                label="Gender"
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ minWidth: 120, fontSize: "0.875rem" }}>
              <InputLabel id="city-select-label">City</InputLabel>
              <Select
                labelId="city-select-label"
                value={selectedCity}
                onChange={handleCityChange}
                label="City"
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          style={{
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            padding: "5px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "ID",
                  "Image",
                  "Full Name",
                  "Demography",
                  "Designation",
                  "Location",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    style={{ fontSize: "0.80rem", fontWeight: "bold" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ fontSize: "0.75rem" }}>
                    {user.id}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.image}
                      alt={user.firstName}
                      style={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: "0.75rem" }}>
                    {user.firstName} {user.maidenName} {user.lastName}
                  </TableCell>
                  <TableCell style={{ fontSize: "0.75rem" }}>
                    {user.gender[0].toUpperCase()}/{user.age}
                  </TableCell>
                  <TableCell style={{ fontSize: "0.75rem" }}>
                    {user.company.title}
                  </TableCell>
                  <TableCell style={{ fontSize: "0.75rem" }}>
                    {user.address.state}, {user.address.city},{" "}
                    {user.address.country}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Filter_Table;
