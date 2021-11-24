import React from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const EmployeeWithBirthday = ({ employee, months }) => {
  return (
    <li className={styles.activeEmployee}>{`${employee.firstName} ${
      employee.lastName
    } - ${employee.dob.getDate()} ${
      months.find((m) => m.index === employee.dob.getMonth()).title
    },  ${employee.dob.getFullYear()} year`}</li>
  );
};

EmployeeWithBirthday.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    dob: PropTypes.instanceOf(Date),
  }),
  months: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default EmployeeWithBirthday;
