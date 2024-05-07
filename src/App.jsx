import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import "./App.css";
import FilterOptions from "./Components/Filter";

function App() {
  const [index, setIndex] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: "",
    location: "",
    experience: "",
    salary: "",
    employees: "",
    company: "",
  });

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    console.log(windowHeight);
    const documentHeight = document.body.scrollHeight;
    console.log(documentHeight);
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (windowHeight + scrollTop + 200 >= documentHeight) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      let headersList = {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Accept: "",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        limit: 20,
        offset: index,
      });
      let response;

      try {
        response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON?Content-Type=application%2Fjson",
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );
      } catch (error) {
        console.log("Error Fetching data ", error);
      } finally {
        let fetchedData = await response.json();
        console.log(fetchedData);

        setData((prevData) => [...data, ...fetchedData.jdList]);
        setLoading(false);
      }
    };
    fetchdata();
  }, [index]);

  useEffect(() => {
    applyFilters();
  }, [data, filters]);

  const applyFilters = () => {
    let filtered = [...data];

    // Apply filters
    filtered = filterByRole(filtered, filters.role);
    filtered = filterByLocation(filtered, filters.location);
    filtered = filterByExperience(filtered, filters.experience);
    filtered = filterBySalary(filtered, filters.salary);
    filtered = filterByCompany(filtered, filters.company);

    setFilteredData(filtered);
  };

  const filterByRole = (data, role) => {
    if (!role) return data;
    const lowercaseRole = role.toLowerCase();
    return data.filter((item) => item.jobRole.toLowerCase() === lowercaseRole);
  };

  const filterByLocation = (data, location) => {
    if (!location) return data;
    const lowercaseLocation = location.toLowerCase();
    return data.filter(
      (item) => item.location.toLowerCase() === lowercaseLocation
    );
  };

  const filterByExperience = (data, experience) => {
    if (!experience || !experience.min || !experience.max) return data;

    const minExperience = experience.min;
    const maxExperience = experience.max;

    return data.filter((item) => {
      const itemMinExp = item.minExp || 0; // Assuming a default value of 0 if minExp is null
      const itemMaxExp = item.maxExp || Infinity; // Assuming a default value of Infinity if maxExp is null

      // Check if item's experience falls within the specified range
      return itemMinExp >= minExperience && itemMaxExp <= maxExperience;
    });
  };

  const filterBySalary = (data, salary) => {
    if (!salary || !salary.min || !salary.max) return data; // If salary is not provided, return the original data

    // Extract min and max salary values from the provided range object
    const { min: minSalary, max: maxSalary } = salary;

    return data.filter((item) => {
      // Parse item salary to number and compare with min and max
      const minJDSalary = item.minJdSalary || 0;
      const maxJDSalary = item.maxJdSalary || Infinity;

      // Handle null cases from backend by assuming a default range

      return minJDSalary >= minSalary && maxJDSalary <= maxSalary;
    });
  };

  const filterByCompany = (data, company) => {
    if (!company) return data;
    const lowercaseCompany = company.toLowerCase();
    return data.filter((item) =>
      item.companyName.toLowerCase().includes(lowercaseCompany)
    );
  };

  console.log(filters);
  return (
    <>
      <FilterOptions filters={filters} setFilters={setFilters} />

      {JSON.stringify(filteredData)}
    </>
  );
}

export default App;
