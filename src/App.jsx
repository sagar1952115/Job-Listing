import React, { useEffect, useState } from "react";
import "./App.css";
import FilterOptions from "./Components/Filter";
import { JobCard } from "./Components/JobCard";
import Loader from "./Components/Loader";
import NoData from "./Components/NoData";

function App() {
  const [offset, setOffset] = useState(1);
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

  // Function to handle scrolling and load more data when reaching the bottom of the page

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    console.log(windowHeight);
    const documentHeight = document.body.scrollHeight;
    console.log(documentHeight);
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (windowHeight + scrollTop + 200 >= documentHeight) {
      setOffset((prevOffset) => prevOffset + 1);
    }
  };

  // Function to apply filters to the job data

  const applyFilters = () => {
    let filtered = [...data];
    filtered = filterByRole(filtered, filters.role);
    filtered = filterByLocation(filtered, filters.location);
    filtered = filterByExperience(filtered, filters.experience);
    filtered = filterBySalary(filtered, filters.salary);
    filtered = filterByCompany(filtered, filters.company);

    setFilteredData(filtered);
  };

  // Filter function to filter job data by role

  const filterByRole = (data, role) => {
    if (!role) return data;
    const lowercaseRole = role.toLowerCase();
    return data.filter((item) => item.jobRole.toLowerCase() === lowercaseRole);
  };

  // Filter function to filter job data by location

  const filterByLocation = (data, location) => {
    if (!location) return data;
    const lowercaseLocation = location.toLowerCase();
    return data.filter(
      (item) => item.location.toLowerCase() === lowercaseLocation
    );
  };

  // Filter function to filter job data by experience range

  const filterByExperience = (data, experience) => {
    if (!experience || !experience.min || !experience.max) return data;

    const minExperience = experience.min;
    const maxExperience = experience.max;

    return data.filter((item) => {
      const itemMinExp = item.minExp || 0;
      const itemMaxExp = item.maxExp || Infinity;

      return itemMinExp >= minExperience && itemMaxExp <= maxExperience;
    });
  };

  // Filter function to filter job data by salary range

  const filterBySalary = (data, salary) => {
    if (!salary || !salary.min || !salary.max) return data;

    const { min: minSalary, max: maxSalary } = salary;

    return data.filter((item) => {
      const minJDSalary = item.minJdSalary || 0;
      const maxJDSalary = item.maxJdSalary || Infinity;

      return minJDSalary >= minSalary && maxJDSalary <= maxSalary;
    });
  };

  // Filter function to filter job data by company name

  const filterByCompany = (data, company) => {
    if (!company) return data;
    const lowercaseCompany = company.toLowerCase();
    return data.filter((item) =>
      item.companyName.toLowerCase().includes(lowercaseCompany)
    );
  };

  // useEffect hook to add scroll event listener when component mounts

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect hook to fetch more data when offset changes

  useEffect(() => {
    const fetchdata = async () => {
      let headersList = {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Accept: "",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        limit: 20,
        offset: offset,
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
        setData((prevData) => [...data, ...fetchedData.jdList]);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    setLoading(true);
    fetchdata();
  }, [offset]);

  // useEffect hook to apply filters whenever data or filter state changes

  useEffect(() => {
    applyFilters();
  }, [data, filters]);

  return (
    <>
      <div className="filter">
        <FilterOptions filters={filters} setFilters={setFilters} />
      </div>
      <div className="job-container">
        {filteredData.length > 0 ? (
          filteredData.map((item, i) => {
            return <JobCard key={i} d={item} />;
          })
        ) : !loading ? (
          <NoData />
        ) : (
          ""
        )}
      </div>
      <div>{loading && <Loader />}</div>
    </>
  );
}

export default App;
