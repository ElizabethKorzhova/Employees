import React from "react";
import EmployeeWithBirthday from "../EmployeeWithBirthday";
import styles from "./styles.module.css";

const EmployeesBirthdayByMonth = ({
  activeEmployees,
  months,
  isLoading,
  employeesBirthdayData,
}) => {
  return (
    <div className={styles.employeesBirthdaySection}>
      <h2 className={styles.employeesBirthdayTitle}>Employees birthday</h2>
      <ul className={styles.listOfMonth}>
        {activeEmployees.length ? (
          months.map((month) => (
            <li key={month.index} className={styles.monthItem}>
              <h3 className={styles.monthTitle}>{month.title}</h3>
              <ul className={styles.listOfEmployees}>
                {isLoading ||
                !employeesBirthdayData[month.index].find((emp) =>
                  activeEmployees.includes(emp.id)
                ) ? (
                  <li className={styles.notActiveEmployees}>No Employees</li>
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
          <li className={styles.emptyList}>Employees List is empty</li>
        )}
      </ul>
    </div>
  );
};

export default EmployeesBirthdayByMonth;
