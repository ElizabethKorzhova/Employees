import React from "react";

const EmployeeWithBirthday = ({ employee, months }) => {
  return (
    <li>{`${employee.firstName} ${
      employee.lastName
    } ${employee.dob.getDate()} ${
      months.find((m) => m.index === employee.dob.getMonth()).title
    } ${employee.dob.getFullYear()} `}</li>
  );
};

export default EmployeeWithBirthday;
