import React from "react";
import styles from "../../styles/Employees.module.css";
import Employee from "../Employee";

const EmployeesGroupedByAlphabet = ({
  letters,
  isLoading,
  employeesData,
  activeEmployees,
  handleRadioButton,
  radioEnum,
}) => {
  return (
    <>
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
                    key={employee.id}
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
    </>
  );
};

export default EmployeesGroupedByAlphabet;
