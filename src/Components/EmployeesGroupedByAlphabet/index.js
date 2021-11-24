import React from "react";
import styles from "./styles.module.css";
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
    <div className={styles.employeesSection}>
      <h2 className={styles.employeesTitle}>Employees</h2>
      <ul className={styles.employeesContainer}>
        {letters.map((letter) => (
          <li className={styles.letter} key={letter}>
            <h3>{letter}</h3>
            <ul>
              {isLoading || !employeesData[letter].length ? (
                <li className={styles.noEmployees}>No Employees</li>
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
    </div>
  );
};

export default EmployeesGroupedByAlphabet;
