const rolesOptions = [
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "Tech Lead", value: "Tech Lead" },
  { label: "Ios", value: "Ios" },
  { label: "Android", value: "Android" },
];

const numberOfEmployeesOptions = [
  { label: "1-10", value: { min: 1, max: 10 } },
  { label: "11-20", value: { min: 11, max: 20 } },
  { label: "21-50", value: { min: 21, max: 50 } },
  { label: "50+", value: { min: 51, max: 1000 } },
];

const experienceOptions = [
  { label: "0-1", value: { min: 0, max: 1 } },
  { label: "1-2", value: { min: 1, max: 2 } },
  { label: "2-5", value: { min: 2, max: 5 } },
  { label: "5-7", value: { min: 5, max: 7 } },
  { label: "7-10", value: { min: 7, max: 10 } },
  { label: "10-12", value: { min: 10, max: 12 } },
];

const minBaseSalaryOptions = [
  { label: "0-50", value: { min: 0, max: 50 } },
  { label: "50-100", value: { min: 50, max: 100 } },
  { label: "100-150", value: { min: 100, max: 150 } },
  { label: "150-200", value: { min: 150, max: 200 } },
  { label: "200-250", value: { min: 200, max: 250 } },
];

const officeTypeOptions = [
  { label: "Remote", value: "Remote" },
  { label: "Chennai", value: "Chennai" },
  { label: "Delhi Ncr", value: "delhi ncr" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Bangalore", value: "Bangalore" },
];

export {
  numberOfEmployeesOptions,
  rolesOptions,
  experienceOptions,
  minBaseSalaryOptions,
  officeTypeOptions,
};
