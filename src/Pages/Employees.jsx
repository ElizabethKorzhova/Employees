import React, { useState, useEffect } from "react";
import axios from "axios";
import Employee from "../Components/Employee";
import styles from "../styles/Employees.module.css";

const radioEnum = {
  notActive: "0",
  active: "1",
};

const getEmployeesData = async () => {
  return (
    await axios.get(
      "https://yalantis-react-school-api.yalantis.com/api/task0/users"
    )
  ).data;
};

const letters = Array(26)
  .fill(0)
  .map((el, i) => String.fromCharCode(65 + i));

const Employees = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeEmployees, setActiveEmployees] = useState([]);

  useEffect(async () => {
    const employees = await getEmployeesData();
    const employeesObj = Object.fromEntries(
      letters.map((letter) => [letter, []])
    );
    employees.forEach((employee) => {
      employeesObj[employee.firstName.charAt(0).toUpperCase()].push({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        dob: employee.dob,
      });
    });
    letters.forEach((letter) =>
      employeesObj[letter].sort((emp1, emp2) =>
        emp1.firstName < emp2.firstName ? -1 : 1
      )
    );
    setEmployeesData(employeesObj);
    setIsLoading(false);
  }, []);

  const handleRadioButton = (event) => {
    const employeeName = event.target.name;
    if (event.target.value === radioEnum.active)
      setActiveEmployees((prev) => [...prev, employeeName]);
    else
      setActiveEmployees((prev) =>
        prev.filter((employee) => employee !== employeeName)
      );
  };

  return (
    <div className={styles.employees}>
      <h2 className={styles.employeesTitle}>Employees</h2>
      <ul className={styles.employeesContainer}>
        {letters.map((letter) => (
          <li className={styles.letter} key={letter}>
            <h3>{letter}</h3>
            <ul className={styles.employeesList}>
              {isLoading || !employeesData[letter].length ? (
                <li>No Employees</li>
              ) : (
                employeesData[letter].map((employee) => (
                  <Employee
                    employee={`${employee.firstName} ${employee.lastName}`}
                    activeEmployees={activeEmployees}
                    handleRadioButton={handleRadioButton}
                    radioEnum={radioEnum}
                  />
                ))
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
