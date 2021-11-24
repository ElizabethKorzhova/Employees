import React from "react";
import styles from "./styles.module.css";

const EmployeeWithBirthday = ({ employee, months }) => {
  return (
    <li className={styles.activeEmployee}>{`${employee.firstName} ${
      employee.lastName
    } - ${employee.dob.getDate()} ${
      months.find((m) => m.index === employee.dob.getMonth()).title
    },  ${employee.dob.getFullYear()} year`}</li>
  );
};

export default EmployeeWithBirthday;
