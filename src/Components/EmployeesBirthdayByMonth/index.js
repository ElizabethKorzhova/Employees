import React from "react";
import EmployeeWithBirthday from "../EmployeeWithBirthday";

const EmployeesBirthdayByMonth = ({
  activeEmployees,
  months,
  isLoading,
  employeesBirthdayData,
}) => {
  return (
    <>
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
                        <EmployeeWithBirthday
                          key={employee.id}
                          employee={employee}
                          months={months}
                        />
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
    </>
  );
};

export default EmployeesBirthdayByMonth;
