import React from "react";
import styles from "./styles.module.css";

const Employee = ({
  employee,
  activeEmployees,
  handleRadioButton,
  radioEnum,
}) => {
  return (
    <li className={styles.employeeContainer}>
      <h4
        className={`${styles.employeeName}
        ${
          activeEmployees.includes(employee)
            ? styles.activeEmployee
            : styles.notActiveEmployee
        }`}
      >
        {employee}
      </h4>
      <div className={styles.radioWrapper}>
        <label className={styles.radioLabel}>
          <input
            className={styles.radioButton}
            type="radio"
            name={employee}
            value={radioEnum.notActive}
            checked={!activeEmployees.includes(employee)}
            onChange={handleRadioButton}
          />
          <span>not active</span>
        </label>
      </div>
      <div className={styles.radioWrapper}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name={employee}
            value={radioEnum.active}
            checked={activeEmployees.includes(employee)}
            onChange={handleRadioButton}
          />
          <span className={styles.radioSpan}>active</span>
        </label>
      </div>
    </li>
  );
};

export default Employee;
