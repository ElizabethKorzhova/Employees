import React from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

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
          activeEmployees.includes(employee.id)
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

Employee.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  employeesData: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      })
    )
  ),
  activeEmployees: PropTypes.array.isRequired,
  handleRadioButton: PropTypes.func.isRequired,
  radioEnum: PropTypes.shape({
    notActive: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
  }),
};

export default Employee;
