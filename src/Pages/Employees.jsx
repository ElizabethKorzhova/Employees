import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [employeesData, setEmployeesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeEmployees, setActiveEmployees] = useState([]);

  useEffect(async () => {
    const employees = await getEmployeesData();
    const employeesObj = Object.fromEntries(
      letters.map((letter) => [letter, []])
    );
    employees.forEach((employee) => {
      employeesObj[employee.firstName.charAt(0).toUpperCase()].push(
        `${employee.firstName} ${employee.lastName}`
      );
    });
    setEmployeesData(employeesObj);
    setIsLoading(false);
  }, []);

  const handleRadioButton = (event) => {
    event.preventDefault();
    const employeeName = event.target.name;
    if (event.target.value === radioEnum.active)
      setActiveEmployees((prev) => [...prev, employeeName]);
    else
      setActiveEmployees((prev) =>
        prev.filter((employee) => employee !== employeeName)
      );
  };

  return (
    <ul>
      {letters.map((letter) => (
        <li key={letter}>
          <h3>{letter}</h3>
          <ul>
            {isLoading || !employeesData[letter].length ? (
              <li>No Employees</li>
            ) : (
              employeesData[letter].map((employee) => (
                <li>
                  {employee}
                  <label>
                    not active
                    <input
                      type="radio"
                      name={employee}
                      value={radioEnum.notActive}
                      checked={!activeEmployees.includes(employee)}
                      onChange={handleRadioButton}
                    />
                  </label>
                  <label>
                    active
                    <input
                      type="radio"
                      name={employee}
                      value={radioEnum.active}
                      checked={activeEmployees.includes(employee)}
                      onChange={handleRadioButton}
                    />
                  </label>
                </li>
              ))
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Employees;
