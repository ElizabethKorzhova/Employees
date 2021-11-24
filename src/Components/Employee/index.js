import React from "react";
import styles from "./styles.module.css";

const Employee = ({
  employee,
  activeEmployees,
  handleRadioButton,
  radioEnum,
}) => {
  return (
    <li>
      <h4
        className={`${styles.employeeName}
        ${
          activeEmployees.includes(employee)
            ? styles.activeEmployee
            : styles.notActiveEmployee
        }`}
      >
        {`${employee.firstName} ${employee.lastName}`}
      </h4>
      <div className={styles.radioWrapper}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name={employee.id}
            value={radioEnum.notActive}
            checked={!activeEmployees.includes(employee.id)}
            onChange={handleRadioButton}
          />
          <span>not active</span>
        </label>
      </div>
      <div className={styles.radioWrapper}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name={employee.id}
            value={radioEnum.active}
            checked={activeEmployees.includes(employee.id)}
            onChange={handleRadioButton}
          />
          <span className={styles.radioSpan}>active</span>
        </label>
      </div>
    </li>
  );
};

export default Employee;
