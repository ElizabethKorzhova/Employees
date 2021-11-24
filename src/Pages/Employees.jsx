import React, { useState, useEffect } from "react";
import axios from "axios";
import Employee from "../Components/Employee";
import styles from "../styles/Employees.module.css";
import { findAllByDisplayValue } from "@testing-library/react";

const radioEnum = {
  notActive: "0",
  active: "1",
};
const months = [
  { index: 0, title: "January" },
  { index: 1, title: "February" },
  { index: 2, title: "March" },
  { index: 3, title: "April" },
  { index: 4, title: "May" },
  { index: 5, title: "June" },
  { index: 6, title: "July" },
  { index: 7, title: "August" },
  { index: 8, title: "September" },
  { index: 9, title: "October" },
  { index: 10, title: "November" },
  { index: 11, title: "December" },
];

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
  const [employeesBirthdayData, setEmployeesBirthdayData] = useState([]);

  useEffect(async () => {
    const employees = await getEmployeesData();
    const employeesObj = Object.fromEntries(
      letters.map((letter) => [letter, []])
    );
    const employeesBdObj = Object.fromEntries(
      months.map((month) => [month.index, []])
    );
    employees.forEach((employee) => {
      employeesObj[employee.firstName.charAt(0).toUpperCase()].push({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
      });
    });

    employees.forEach((employee) => {
      const date = new Date(employee.dob);
      employeesBdObj[date.getMonth()].push({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        dob: date,
      });
    });

    letters.forEach((letter) =>
      employeesObj[letter].sort((emp1, emp2) =>
        emp1.firstName < emp2.firstName ? -1 : 1
      )
    );

    months.forEach((month) =>
      employeesBdObj[month.index].sort((emp1, emp2) =>
        emp1.lastName < emp2.lastName ? -1 : 1
      )
    );
    setEmployeesData(employeesObj);
    setEmployeesBirthdayData(employeesBdObj);
    setIsLoading(false);
  }, []);

  const handleRadioButton = (event) => {
    const employeeName = event.target.name;
    if (event.target.value === radioEnum.active) {
      setActiveEmployees((prev) => [...prev, employeeName]);
    } else {
      setActiveEmployees((prev) =>
        prev.filter((employee) => employee !== employeeName)
      );
    }
  };

  return (
    <div className={styles.employeesSection}>
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
                      employee={employee}
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
      <div>
        <h2>Employees birthday</h2>
        <ul>
          {activeEmployees.length ? (
            months.map((month) => (
              <li key={month.index}>
                {month.title}
                <ul>
                  {isLoading ||
                  !employeesBirthdayData[month.index].find((emp) =>
                    activeEmployees.includes(emp.id)
                  ) ? (
                    <li>No Employees</li>
                  ) : (
                    employeesBirthdayData[month.index].map((employee) => {
                      if (activeEmployees.includes(employee.id))
                        return (
                          <li key={employee.id}>{`${employee.firstName} ${
                            employee.lastName
                          } ${employee.dob.getDate()} ${
                            months.find(
                              (m) => m.index === employee.dob.getMonth()
                            ).title
                          } ${employee.dob.getFullYear()} `}</li>
                        );
                    })
                  )}
                </ul>
              </li>
            ))
          ) : (
            <li>Employees List is empty</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Employees;
