import React from "react";
import { makeStyles, ThemeProvider } from "@mui/styles";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  createTheme,
} from "@mui/material";
import {
  rolesOptions,
  minBaseSalaryOptions,
  officeTypeOptions,
  experienceOptions,
  numberOfEmployeesOptions,
} from "../DropDownData";

const theme = createTheme(); // Create a theme

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",
  },
}));

const FilterOptions = ({ filters, setFilters }) => {
  const classes = useStyles();

  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCompanyChange = (event) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      company: value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={2}
        style={{ maxWidth: "1600px", margin: "0 auto" }}
      >
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Search Company Name"
            variant="outlined"
            fullWidth
            value={filters.company}
            onChange={handleCompanyChange}
            name="company"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              value={filters.role}
              onChange={handleDropdownChange}
              name="role"
            >
              {rolesOptions.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Number of Employees</InputLabel>
            <Select
              label="Number of Employees"
              value={filters.employees}
              onChange={handleDropdownChange}
              name="employees"
            >
              {numberOfEmployeesOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Experience</InputLabel>
            <Select
              label="Experience"
              value={filters.experience}
              onChange={handleDropdownChange}
              name="experience"
            >
              {experienceOptions.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Minimum Base Salary ($)</InputLabel>
            <Select
              label="Minimum Base Salary ($)"
              value={filters.salary}
              onChange={handleDropdownChange}
              name="salary"
            >
              {minBaseSalaryOptions.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Office Type</InputLabel>
            <Select
              label="Office Type"
              value={filters.location}
              onChange={handleDropdownChange}
              name="location"
            >
              {officeTypeOptions.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default FilterOptions;
